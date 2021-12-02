const util = require('util')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const dbConfig = require('../config/db.js')

const storage = new GridFsStorage({
    url : dbConfig.url + dbConfig.database,
    options : { useNewUrlParser : true, useUnifiedTopology : true},
    file : (req, file) => {
        const match = ['image/png', 'image/jpg']

        if(match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-and-${file.originalname}`
            return filename
        }

        return {
            bucketName : dbConfig.imgBucket,
            filename   : `${Date.now()}-and-${file.originalname}`
        }
    }
})

const uploadFile = multer({storage}).single('file')
const uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware