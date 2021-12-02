const util = require('util')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const dbConfig = require('../config/db.js')

const storage = new GridFsStorage({
    url : dbConfig.url + dbConfig.database,
    options : { useNewUrlParser : true, useUnifiedTopology : true},
    file : async (req, file) => {
        const match = ['image/png', 'image/jpg']

        if( match.indexOf(file.mimetype) === -1){
            const filename = await `${Date.now()}-and-${file.originalname}`
            return filename
        }

         return {
            bucketName : 'images',
            filename   : `${Date.now()}-and-${file.originalname}`
        }
    }
})

const uploadFiles = multer({storage}).array('files', 3)
const uploadFilesMiddleware = util.promisify(uploadFiles)
module.exports = uploadFilesMiddleware