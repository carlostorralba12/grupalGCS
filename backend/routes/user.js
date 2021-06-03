'use strict'

var express = require('express');
var userController = require('../controllers/user');
var router = express.Router();
var mdAuth = require('../middlewares/authenticate');
//var multiparty = require('connect-multiparty');
//var mdUpload = multiparty({uploadDir: './uploads/users'});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/users/')
    },
    filename: function(req, file, cb){
        cb(null,"user"+Date.now()+file.originalname);
    }
});

const upload = multer ({storage:storage});

//Rutas de usuarios
router.post('/register',userController.save);
router.post('/login',userController.login);
router.put('/update',mdAuth.authenticated,userController.update);
router.post('/upload-avatar',[mdAuth.authenticated,upload.single('file0')],userController.uploadAvatar);
router.get('/avatar/:fileName',userController.avatar);
router.get('/users',userController.getUsers);
router.get('/user/:userId',userController.getUser);

module.exports = router;