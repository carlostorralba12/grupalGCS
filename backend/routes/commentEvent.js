'use strict'

var express = require('express');
var commentController = require('../controllers/commentEvent');
var router = express.Router();
var mdAuth = require('../middlewares/authenticate');

router.post('/comment/event/:eventId',mdAuth.authenticated,commentController.add);
router.put('/comment/:commentId',mdAuth.authenticated,commentController.update);
router.delete('/comment/:topicId/:commentId',mdAuth.authenticated,commentController.delete);

module.exports = router;