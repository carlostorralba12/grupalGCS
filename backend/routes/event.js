'use strict'

var express = require('express');
var eventController = require('../controllers/event');
var router = express.Router();
var mdAuth = require('../middlewares/authenticate');


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/events/')
    },
    filename: function(req, file, cb){
        cb(null,"event"+Date.now()+file.originalname);
    }
});

const upload = multer ({storage:storage});

router.post('/event',mdAuth.authenticated,eventController.save);
router.get('/events/:page?',eventController.getEvents);
router.get('/user-events/:user',eventController.getEventsByUSer);
router.get('/event/:id',eventController.getEvent);
router.put('/event/:id',mdAuth.authenticated,eventController.update);
router.delete('/event/:id',mdAuth.authenticated,eventController.delete);
router.get('/search/:search',eventController.search);

router.post('/upload-event/:id',[mdAuth.authenticated,upload.single('file0')],eventController.uploadImage);
router.get('/get-image-event/:image',eventController.getImage)

module.exports = router;