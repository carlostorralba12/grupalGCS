'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');


//Model de Comment
var CommentSchema = Schema({
    content: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref:'User'}
});

var Comment = mongoose.model('Comment', CommentSchema);

//Model de Topic
var topicSchema = Schema ({
    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref:'User'},
    image: String,
    comments: [CommentSchema]
});

//Cargar paginacion 
topicSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Topic',topicSchema);