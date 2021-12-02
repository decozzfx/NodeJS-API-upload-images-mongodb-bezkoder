const express = require('express')
const PageController = require('../controllers/routes.js')
const uploadControler = require('../controllers/upload.js')
const { default: stream } = require('../middlewares/stream.js')


const router = express.Router()

// routes page
router.get('/' , PageController.getHome)
router.get('/single' , PageController.getSingle)
router.get('/multiple' , PageController.getMultiple)

// routes endpoint
router.post('/single', uploadControler.uploadFile)
router.post('/multiple', uploadControler.uploadFiles)
router.get('/files/:name', uploadControler.download)
router.get('/files', uploadControler.getListFiles, stream)

module.exports = router
