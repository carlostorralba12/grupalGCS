'use strict'

var express = require('express');
var commentController = require('../controllers/commentEvent');
var router = express.Router();
var mdAuth = require('../middlewares/authenticate');

router.post('/commentEvent/event/:eventId',mdAuth.authenticated,commentController.add);
router.put('/commentEvent/:commentId',mdAuth.authenticated,commentController.update);
router.delete('/commentEvent/:eventId/:commentId',mdAuth.authenticated,commentController.delete);

module.exports = router;
