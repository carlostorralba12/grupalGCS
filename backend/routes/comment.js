'use strict'

var express = require('express');
var commentController = require('../controllers/comment');
var router = express.Router();
var mdAuth = require('../middlewares/authenticate');

router.post('/comment/topic/:topicId',mdAuth.authenticated,commentController.add);
router.put('/comment/:commentId',mdAuth.authenticated,commentController.update);
router.delete('/comment/:topicId/:commentId',mdAuth.authenticated,commentController.delete);

module.exports = router;