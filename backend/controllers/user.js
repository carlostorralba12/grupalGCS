'user strict'

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

var controller = {

    login: function(req,res){
        //Recoger los parametros de la peticion
        var params = req.body;
        //Validar los datos 
        var validateEmail = !validator.isEmpty(params.email) &&validator.isEmail(params.email);
        var validatePassword = !validator.isEmpty(params.password);

        if(validateEmail && validatePassword){
            //Buscar usuarios que coincidan con el email
            User.findOne({email: params.email.toLowerCase()},(err,user)=>{
                
                if(err){
                    return res.status(500).send({
                        message: "Error al intentar identificarse"
                     
                    });
                }
                
                if(!user){
                    return res.status(404).send({
                        message: "El usuario no existe"
                        
                    });
                }
                //Si lo encuentra, 
                //Comprobar la contraseña
                bcrypt.compare(params.password, user.password, (err,check)=>{



                    //Si es ok,
                    if(check){
                        //Generar token jwt y devolverlo
                        /*if(params.gettoken){
                            //Devolver los datos
                            return res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }*/
                        
                        
                        //Limpiar el objeto User lo hago para que el cliente no pueda acceder a la contraseña
                        user.password = undefined;
                        //Devolver los datos
                        return res.status(200).send({
                            message: "success",
                            user: user,
                            token:jwt.createToken(user)
                        });
                    }
                    else{
                        return res.status(404).send({
                            message: "Las credenciales no son correctas"
                        });
                    }
                });
                
            });

        }
        else{
            return res.status(500).send({
                message: "los datos no son correctos"
            });
        }
       
    },

    save: function(req,res){
        //Recoger los parametros de la peticion
        var params = req.body;
        //Validar los datos
        var validateName = !validator.isEmpty(params.name);
        var validateSurName = !validator.isEmpty(params.surname);
        var validateEmail = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validatePassword = !validator.isEmpty(params.password);

        if(validateName && validateSurName && validateEmail && validatePassword){
            //Crear objeto usuario
            var user = new User();
            
            //Asignar valores al usuario
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.password = params.password;
            user.role = 'ROLE_USER';
            user.image = null;
            
            //Comprobar si el usuario existe
            User.findOne({email: user.email}, (err, issetUser)=>{
                if(err){
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad de usuario",
                        status: 'error'
                    });
                }
                if(!issetUser){
                    //Si no existe,cifrar la contra y guardarlo
                    //Cifrar
                    const saltRounds = 10;
                    bcrypt.hash(params.password,saltRounds,(err,hash)=>{
                        user.password = hash;
                        //Guardar
                        user.save((err,userStored)=>{
                            if(err){
                                return res.status(500).send({
                                    message: "Error al guardar usuario",
                                    status: 'error'
                                });
                            }
                           if(!userStored){
                                return res.status(500).send({
                                    message: "El usuario no se ha guardado",
                                    status: 'error'
                                });
                           }
                           //Devolver respuesta
                           return res.status(200).send({
                                status:'success',
                                user: userStored
                            });

                        });
                    });
                }
                else{
                    return res.status(500).send({
                        status: 'error',
                        message: "Error el usuario ya esta registrado",
                        status: 'error'
                    });
                }
            });
        }
        else{
            return res.status(400).send({
                message: "La validación de datos del usuario es incorrecta",
                status: 'error'
            });
        }
    },

    update: function(req,res){
        //Recoger los datos
        var params = req.body;

        //Validar datos
        try{
        var validateName = !validator.isEmpty(params.name);
        var validateSurName = !validator.isEmpty(params.surname);
        var validateEmail = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        }
        catch(err){
            return res.status(400).send({
                message: "faltan datos por enviar"
            });
        }

        //Eliminar propiedades innecesarias
        delete params.password;

        //Comprobar si el email es único
        if(req.user.email != params.email){
            User.findOne({email: params.email.toLowerCase()},(err,user)=>{
                
                if(err){
                    return res.status(500).send({
                        message: "Error al intentar identificarse"
                     
                    });
                }
                
                    
                
                    //Buscar y actualizar 
                    var userId = req.user.sub;

                    User.findOneAndUpdate({_id: userId},params,{new:true},(err,userUpdated) =>{
                        
                        if(err){
                            return res.status(500).send({
                                status: 'Error',
                                message: 'error al actualizar'
                            });
                        }
                        if(!userUpdated){
                            return res.status(500).send({
                                status:'error',
                                user:userUpdated
                            });
                        }
                        //Devolver respuesta
                        return res.status(200).send({
                            status:'success',
                            user:userUpdated
                        });
                    });
                
            });
        }
        else{
            //Buscar y actualizar 
            var userId = req.user.sub;
            User.findOneAndUpdate({_id: userId},params,{new:true},(err,userUpdated) =>{

                if(err){
                    return res.status(500).send({
                        status: 'Error',
                        message: 'error al actualizar'
                    });
                }
                if(!userUpdated){
                    return res.status(500).send({
                        status:'error',
                        user:userUpdated
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status:'success',
                    user:userUpdated
                });
            });
        }
    },

    uploadAvatar: function(req,res){
        
        //Recoger el fichero de la peticion
        var fileName = 'Avatar no subido';
        
        console.log(req.file,"subido")

        if(!req.file){
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

        //Comprobar extension (solo imagenes),si no es valido borrar el ficero 

        if(extension != 'png' && extension != 'jpg' && extension != 'jpeg'){
            fs.unlink(filePath, (err)=>{

                return res.status(400).send({
                   message: 'extension del archivo no es valida'
                });

            });
        }
        else{
            //Sacar el id del usuario identificado
            var userId = req.user.sub;

            //Buscar y actualizar documento
            User.findOneAndUpdate({_id:userId},{image:fileName},{new:true},(err,userUpdated)=>{
                if(err ||!userUpdated){
                    return res.status(500).send({
                        message:'Error al guardar la imagen'
                    });
                }

                return res.status(200).send({
                    status:'success',
                    user:userUpdated
                });
            });
        }
    },

    avatar: function(req, res){
        /*var fileName = req.params.fileName;
        var pathFile = './uploads/users/' + fileName;
        console.log(pathFile);
        console.log(fileName + " este es el filename");
        fs.access(pathFile, fs.constants.R_OK, (err) => {
          if(err){
            return res.status(404).send({
                message: 'La imagen no existe!!!',
              });
          }else{
            return res.sendFile(path.resolve(pathFile));
          }
        });*/

        var fileName = req.params.fileName;
        var pathFile = './uploads/users/'+fileName;
       console.log(pathFile); 
        
        if (fs.existsSync(pathFile)) {
            return res.sendFile(path.resolve(pathFile));
        }else{
            return res.status(400).send({
                status: 'error',
                message: 'La imagen no existe'
            });
        }
    },

    getUsers: function(req,res){
        User.find().exec((err,users) =>{
            if(err || !users){
                return res.status(404).send({
                    message: 'No hay usuarios'
                });
            }
            return res.status(200).send({
                status: 'success',
                users: users
            })
        });
    },

    getUser: function(req,res){
        var userId = req.params.userId;

        User.findById(userId).exec((err,user) =>{
            if(err || !user){
                return res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
            return res.status(200).send({
                status: 'success',
                user: user
            })
        });
    }
};

module.exports = controller;