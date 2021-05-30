'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate-v2');


//Model de Comment
var CommentEventSchema = Schema({
    content: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref:'User'}
});


//Model de Topic
var eventSchema = Schema ({
    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref:'User'},
    image: String,
    comments: [CommentEventSchema]
});

//Cargar paginacion 
eventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event',eventSchema);