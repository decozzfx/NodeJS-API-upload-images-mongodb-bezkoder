const uploads = require('../middlewares/uploads.js')
const upload = require('../middlewares/upload.js')
const dbConfig = require('../config/db.js')

const {MongoClient} = require('mongodb')
const {GridFSBucket} = require('mongodb')

const url = dbConfig.url 
const baseUrl = 'http://localhost:5000/files/'

const mongoClient = new MongoClient(url)

const uploadFile = async (req, res) => {
    try {
        await upload(req, res)
        console.info(req.file)
        
        if(req.file == undefined){
            return res.send({ message : 'you must select file'})
        }
        
        return res.send({ message : 'File has been uploaded'})

    } catch (error) {
        return res.send({message: "Error when trying upload image: ${error}"});
  
    }
}

const uploadFiles = async (req, res) => {
    try {
        await uploads(req, res)
        console.log(req.files);

        if (req.files.length <= 0) {
        return res.status(400).send({ message: "You must select at least 1 file." });
        }

        return res.status(200).send({message: "Files have been uploaded."});

    } catch (error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).send({ message: "Too many files to upload."});
        }
        
        return res.status(500).send({ message: `Error when trying upload many files: ${error}`});
    }
}

const getListFiles = async (req, res) => {
    try {
        await mongoClient.connect()
        console.info('connected')       

        const database = mongoClient.db(dbConfig.database)
        const images = database.collection(dbConfig.imgBucket + '.files')

        const cursor = images.find({})

        if (await cursor.count === 0){
            return res.status(400).send({ message : 'Files not found'})
        }

        let fileInfos = []
        await cursor.forEach((doc) => {
            fileInfos.push({
                name : doc.filename,
                url : baseUrl + doc.filename
            })
        })
        return res.status(200).send(fileInfos)

    } catch (error) {
        return res.status(500).send({ message : error.message})
    }   
}

const download = async (req, res) => {
    try {
        await mongoClient.connect()

        const database = mongoClient.db(dbConfig.database)
        const bucket = new GridFSBucket(database, { bucketName : dbConfig.imgBucket})
        
        let downloadStream = bucket.openDownloadStreamByName(req.params.name)

        downloadStream.on('data', data => { return res.status(200).write(data) })
        downloadStream.on('error', err => { return res.status(404).send({ message : 'cannot download this file'})})
        downloadStream.on('end', () => { return res.end })
    } catch (error) {
        return res.status(500).send({ message : error.message})
    }
}

module.exports = { uploadFiles, getListFiles, download, uploadFile}