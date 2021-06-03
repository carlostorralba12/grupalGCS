"use strict";
var Topic = require("../models/topic");
var validator = require("validator");

var controller = {
  add: function(req, res) {
    //Recoger idTopic
    var topicId = req.params.topicId;
    //Find por id del topic
    Topic.findById(topicId)
    .exec((err, topic) => {
      console.log("Dentro del metrodo");
      if (err) {
        return res.status(400).send({
          message: "Error en la petición",
        });
      }

      if (!topic) {
        return res.status(400).send({
          message: "No se ha encontrado el tema de popst",
        });
      }

      //Comprobar objeto usuario y validar datos
      if (req.body.content) {
        console.log("valido?");
        try {
          var validateContent = !validator.isEmpty(req.body.content);
        } catch (err) {
          return res.status(400).send({
            message: "No has comentado nada",
          });
        }

        if (validateContent) {
          //En la propiedad comments del objeto resultante hacer un push
          var comment = {
            user: req.user.sub,
            content: req.body.content,
          };
          topic.comments.push(comment);
          console.log("valido?");
          //Guardar el topic
          topic.save((err) => {
            if (err) {
              return res.status(400).send({
                message: "Error en guardar el comentario",
              });
            }

            Topic.findById(topic._id)
              .populate("user")
              .populate("comments.user")
              .exec((err, topic) => {
                if (err) {
                  return res.status(400).send({
                    message: "error",
                  });
                }
                if (!topic) {
                  return res.status(404).send({
                    message: "No hay temas ",
                  });
                }

                return res.status(200).send({
                  status: "success",
                  topic,
                });
              });
          });
        } else {
          return res.status(400).send({
            message: "No se han validado los datos del comentario",
          });
        }
      }
    });
  },
  update: function(req, res) {
    //Conseguir id del comentario
    var commentId = req.params.commentId;
    //Recoger datos y validar
    var params = req.body;

    try {
      var validateContent = !validator.isEmpty(params.content);
    } catch (err) {
      return res.status(400).send({
        message: "No has comentado nada",
      });
    }

    if (validateContent) {
      //find and update de subdocumento
      Topic.findOneAndUpdate(
        { "comments._id": commentId },
        {
          $set: {
            "comments.$.content": params.content,
          },
        },
        { new: true },
        (err, topicUpdated) => {
          if (err) {
            return res.status(400).send({
              message: "Error en la petición",
            });
          }

          if (!topicUpdated) {
            return res.status(400).send({
              message: "No se ha encontrado el tema de post",
            });
          }
          //devolver datos
          return res.status(200).send({
            message: "Update comment",
            topic: topicUpdated,
          });
        }
      );
    }
  },
  delete: function(req, res) {
    //Sacar el id del topic y del comentario a borrar
    var topicId = req.params.topicId;
    var commentId = req.params.commentId;
    //Buscar el topic
    Topic.findById(topicId, (err, topic) => {
      if (err) {
        return res.status(400).send({
          message: "Error en la petición",
        });
      }

      if (!topic) {
        return res.status(400).send({
          message: "No se ha encontrado el tema de post",
        });
      }

      //Seleccionar el subdocumento (comentario)
      var comment = topic.comments.id(commentId);
      //Borrar el comentario
      if (comment) {
        comment.remove();
        //Guardar el topic
        topic.save((err) => {
          if (err) {
            return res.status(400).send({
              message: "Error en la petición",
            });
          }
          Topic.findById(topic._id)
              .populate("user")
              .populate("comments.user")
              .exec((err, topic) => {
                if (err) {
                  return res.status(400).send({
                    message: "error",
                  });
                }
                if (!topic) {
                  return res.status(404).send({
                    message: "No hay temas ",
                  });
                }

                return res.status(200).send({
                  status: "success",
                  topic,
                });
              });
        });
      } else {
        return res.status(400).send({
          message: "No existe el comentario",
        });
      }
    });
  },
};

module.exports = controller;
