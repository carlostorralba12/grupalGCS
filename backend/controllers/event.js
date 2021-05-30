'use strict'
var validator = require('validator');
var Event = require('../models/event');

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
            var event = new Event();
            //Asignar valores
            event.title = params.title;
            event.content = params.content;
            event.user = req.user.sub;
            //Guardar el event
            event.save((err,eventStored)=>{
                
                if(err || !eventStored){
                    return res.status(400).send({
                        status: 'error',
                        message:'Error al guardar'
                    });
                }
                
                //Respuesta
                return res.status(200).send({
                    status: 'success',
                    event: eventStored
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
    getEvents: function(req,res){
        
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
        Event.paginate({},options,(err,events)=>{
            
            if(err){
                return res.status(400).send({
                    message: 'Error al hacer la consulta'
                });
            }

            if(!events){
                return res.status(404).send({
                    message: 'No hay events'
                });
            }
            
            //Devolver el resultado (events, total de event, total de paginas)
            return res.status(200).send({
                status: 'success',
                events: events.docs,
                totalDocs: events.totalDocs,
                totalPages: events.totalPages,
                page: page
            });
        });
    },

    getEventsByUSer: function(req,res){
        //Conseguir el id del usuario
        var  userId = req.params.user;
        //Find con una condicion de usuario
        Event.find({
            user:userId
        })
        .sort([['date','descending']])
        .exec((err,events) =>{
            if(err){
                return res.status(500).send({
                    message: 'Error en la petición'
                });
            }
            if(!events){
                return res.status(404).send({
                    message: 'No hay temas para mostrar'
                });
            }
            //Devolver un resultado
            return res.status(200).send({
                status: 'success',
                message: 'Bien my events',
                events
            });
        });
    },

    getEvent: function(req,res){
        //Sacar el id 
        var eventId = req.params.id;
        //Find por id del event
        Event.findById(eventId)
             .populate('user')
             .populate('comments.user')
             .exec((err,event)=>{
                
                if(err){
                    return res.status(400).send({
                        message: 'error'
                    });
                }
                if(!event){
                    return res.status(404).send({
                        message: 'No hay temas '
                    });
                }

                return res.status(200).send({
                   status: 'success',
                   event
                });
             });
        
    },

    update: function(req,res){
        //Recoger el id 
        var eventId = req.params.id;
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

        if(validateTitle &&  validateContent){
            //Montar JSON con los datos modificables
            var update = {
                title: params.title,
                content: params.content,
            }
            //Find and update del event por id y por id usuario
            Event.findOneAndUpdate({_id: eventId, user:req.user.sub},update,{new:true}, (err,eventUpdated)=>{
                
                if(err){
                    //Devolver respuesta
                    return res.status(400).send({
                        status: "error",
                        message: 'error en la peticion',
                
                    });
                }
                if(!eventUpdated){
                    return res.status(404).send({
                        status: "error",
                        message: 'No se ha actualizado el tema',
                
                    });
                }

                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    event: eventUpdated
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
        var eventId = req.params.id;
        //Find and delete por event y por user
        Event.findByIdAndDelete({_id:eventId, user:req.user.sub}, (err,eventDeleted)=>{

            if(err){
                //Devolver respuesta
                return res.status(400).send({
                    message: 'error en la peticion',
            
                });
            }
            if(!eventDeleted){
                return res.status(404).send({
                    message: 'No se ha borrado el tema',
            
                });
            }

            //Devolver respuesta
            return res.status(200).send({
                status: 'success',
                event: eventDeleted
            });
        });
       
    },
    
    search: function(req,res){
        //Sacar string a buscar
        var searchString = req.params.search;
        //Find operador or
        Event.find({"$or":[
            {"title":{"$regex":searchString, "$options": "i"}},
            {"content":{"$regex":searchString, "$options": "i"}}
            ]

        })
        .populate('user')
        .sort([['date','descending']])
        .exec((err,events) =>{
            if(err){
                //Devolver respuesta
                return res.status(400).send({
                    message: 'error en la peticion',
            
                });
            }
            if(!events){
                return res.status(404).send({
                    message: 'No se ha encontrado el tema',
            
                });
            }
            //Devolver resultado
            return res.status(200).send({
                status:'success',
                events: events
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
            var eventId = req.params.id;
            Event.findOneAndUpdate({_id: eventId},{image: fileName}, {new:true},(err,eventUpdated) => {


                if(err ||!eventUpdated){
                    return res.status(500).send({
                        message:'Error al guardar la imagen'
                    });
                }

                return res.status(200).send({
                    status:'success',
                    event:eventUpdated
                });

            })
        }

    },
    getImage: function (req, res) {
        var file = req.params.image;

        var path_file = './uploads/events/'+file;

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