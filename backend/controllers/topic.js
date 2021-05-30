'use strict'
var validator = require('validator');
var Topic = require('../models/topic');
var fs = require('fs');
var path = require('path');


var controller = {

    save: function(req,res){
        //Recoger parametros
        var params = req.body;
        
        //Validar los datos
        try {
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(400).send({
                status: 'error',
                message:"Faltan datos por enviar"
            })
        }
        if(validateContent  && validateTitle){
            //Crear objeto
            var topic = new Topic();
            //Asignar valores
            topic.title = params.title;
            topic.content = params.content;
            topic.user = req.user.sub;
            //Guardar el topic
            topic.save((err,topicStored)=>{
                
                if(err || !topicStored){
                    return res.status(400).send({
                        status: 'error',
                        message:'Error al guardar'
                    });
                }
                
                //Respuesta
                return res.status(200).send({
                    status: 'success',
                    topic: topicStored
                });
            });
        }
        else{
            return res.status(400).send({
                status: 'error',
                message: 'Error en la validación'
            });
        }
    },
    getTopics: function(req,res){
        
        //Recoger pagina actual
        if(req.params.page == 0 || req.param.page == "0" || !req.params.page || req.params.page == undefined){
            var page = 1;
        }
        else{
            var page = parseInt(req.params.page);
        }

        //Indicar opciones de paginacion
        var options = {
            sort:{date: -1},//Orden descendente
            populate: 'user',//Objeto completo de usuario
            limit: 5,
            page:page
        }
        //Find paginado
        Topic.paginate({},options,(err,topics)=>{
            
            if(err){
                return res.status(400).send({
                    message: 'Error al hacer la consulta'
                });
            }

            if(!topics){
                return res.status(404).send({
                    message: 'No hay topics'
                });
            }
            
            //Devolver el resultado (topics, total de topic, total de paginas)
            return res.status(200).send({
                status: 'success',
                topics: topics.docs,
                totalDocs: topics.totalDocs,
                totalPages: topics.totalPages,
                page: page
            });
        });
    },

    getTopicsByUSer: function(req,res){
        //Conseguir el id del usuario
        var  userId = req.params.user;
        //Find con una condicion de usuario
        Topic.find({
            user:userId
        })
        .sort([['date','descending']])
        .exec((err,topics) =>{
            if(err){
                return res.status(500).send({
                    message: 'Error en la petición'
                });
            }
            if(!topics){
                return res.status(404).send({
                    message: 'No hay temas para mostrar'
                });
            }
            //Devolver un resultado
            return res.status(200).send({
                status: 'success',
                message: 'Bien my topics',
                topics
            });
        });
    },

    getTopic: function(req,res){
        //Sacar el id 
        var topicId = req.params.id;
        //Find por id del topic
        Topic.findById(topicId)
             .populate('user')
             .populate('comments.user')
             .exec((err,topic)=>{
                
                if(err){
                    return res.status(400).send({
                        message: 'error'
                    });
                }
                if(!topic){
                    return res.status(404).send({
                        message: 'No hay temas '
                    });
                }

                return res.status(200).send({
                   status: 'success',
                   topic
                });
             });
        
    },

    update: function(req,res){
        //Recoger el id 
        var topicId = req.params.id;
        //Recoger los datos 
        var params = req.body;
        //Validar datos
        try {
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);
           
            
        } catch (err) {
            return res.status(400).send({
                status: "error",
                message:"Faltan datos por enviar"
            })
        }

        if(validateTitle && validateContent){
            //Montar JSON con los datos modificables
            var update = {
                title: params.title,
                content: params.content,
            }
            //Find and update del topic por id y por id usuario
            Topic.findOneAndUpdate({_id: topicId, user:req.user.sub},update,{new:true}, (err,topicUpdated)=>{
                
                if(err){
                    //Devolver respuesta
                    return res.status(400).send({
                        status: "error",
                        message: 'error en la peticion',
                
                    });
                }
                if(!topicUpdated){
                    return res.status(404).send({
                        status: "error",
                        message: 'No se ha actualizado el tema',
                
                    });
                }

                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    topic: topicUpdated
                });
            });
        }
        else{
            return res.status(400).send({
                status: 'error',
                message:"la validación de los datos no es correcta"
                
            });
        }
    },
    delete: function(req, res){
        //Sacar el id
        var topicId = req.params.id;
        //Find and delete por topic y por user
        Topic.findByIdAndDelete({_id:topicId, user:req.user.sub}, (err,topicDeleted)=>{

            if(err){
                //Devolver respuesta
                return res.status(400).send({
                    message: 'error en la peticion',
            
                });
            }
            if(!topicDeleted){
                return res.status(404).send({
                    message: 'No se ha borrado el tema',
            
                });
            }

            //Devolver respuesta
            return res.status(200).send({
                status: 'success',
                topic: topicDeleted
            });
        });
       
    },
    
    search: function(req,res){
        //Sacar string a buscar
        var searchString = req.params.search;
        //Find operador or
        Topic.find({"$or":[
            {"title":{"$regex":searchString, "$options": "i"}},
            {"content":{"$regex":searchString, "$options": "i"}},
            {"lang":{"$regex":searchString, "$options": "i"}},
            {"code":{"$regex":searchString, "$options": "i"}}
            ]

        })
        .populate('user')
        .sort([['date','descending']])
        .exec((err,topics) =>{
            if(err){
                //Devolver respuesta
                return res.status(400).send({
                    message: 'error en la peticion',
            
                });
            }
            if(!topics){
                return res.status(404).send({
                    message: 'No se ha encontrado el tema',
            
                });
            }
            //Devolver resultado
            return res.status(200).send({
                status:'success',
                topics: topics
            });
        });
    },

    uploadImage: function (req, res) {
        //Recoger el fichero de la petición

        var fileName = 'Imagen no subida';

        if(!req.file) {
             //Devolver respuesta
             return res.status(400).send({
                message:'Imagen no subida'
            });
        }

        //Conseguir el nombre y la extension del archivo subido
        var filePath = req.file.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];
        var extensionSplit = fileName.split('\.');
        var extension = extensionSplit[1];


        if(extension != 'png' && extension != 'jpg' && extension != 'jpeg'){
            fs.unlink(filePath, (err)=>{

                return res.status(400).send({
                   message: 'extension del archivo no es valida'
                });

            });
        }else{
            //Buscamos el Posts para Meter la imagen
            var topicId = req.params.id;
            Topic.findOneAndUpdate({_id: topicId},{image: fileName}, {new:true},(err,topicUpdated) => {


                if(err ||!topicUpdated){
                    return res.status(500).send({
                        message:'Error al guardar la imagen'
                    });
                }

                return res.status(200).send({
                    status:'success',
                    topic:topicUpdated
                });

            })
        }

    },
    getImage: function (req, res) {
        var file = req.params.image;

        var path_file = './uploads/posts/'+file;

        if (fs.existsSync(path_file)) {
            return res.sendFile(path.resolve(path_file));
        }else{
            return res.status(400).send({
                status: 'error',
                message: 'La imagen no existe'
            });
        }
    }
};

module.exports = controller;