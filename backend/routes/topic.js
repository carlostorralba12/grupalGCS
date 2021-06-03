'use strict'

var express = require('express');
var topicController = require('../controllers/topic');
var router = express.Router();
var mdAuth = require('../middlewares/authenticate');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/posts/')
    },
    filename: function(req, file, cb){
        cb(null,"post"+Date.now()+file.originalname);
    }
});

const upload = multer ({storage:storage});

router.post('/topic',mdAuth.authenticated,topicController.save);
router.get('/topics/:page?',topicController.getTopics);
router.get('/user-topics/:user',topicController.getTopicsByUSer);
router.get('/topic/:id',topicController.getTopic);
router.put('/topic/:id',mdAuth.authenticated,topicController.update);
router.delete('/topic/:id',mdAuth.authenticated,topicController.delete);
router.get('/search/:search',topicController.search);
router.post('/upload-post/:id',[mdAuth.authenticated,upload.single('file0')],topicController.uploadImage);
router.get('/get-image-post/:image',topicController.getImage)
module.exports = router;