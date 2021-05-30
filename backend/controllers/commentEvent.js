"use strict";
var Event = require("../models/event");
var validator = require("validator");

var controller = {
  add: function(req, res) {
    //Recoger idevent
    var eventId = req.params.eventId;
    //Find por id del event
    Event.findById(eventId).exec((err, event) => {
      console.log("Dentro del metrodo");
      if (err) {
        return res.status(400).send({
          message: "Error en la petición",
        });
      }

      if (!event) {
        return res.status(400).send({
          message: "No se ha encontrado el tema",
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
          event.comments.push(comment);
          console.log("valido?");
          //Guardar el event
          event.save((err) => {
            if (err) {
              return res.status(400).send({
                message: "Error en guardar el comentario",
              });
            }

            Event.findById(event._id)
              .populate("user")
              .populate("comments.user")
              .exec((err, event) => {
                if (err) {
                  return res.status(400).send({
                    message: "error",
                  });
                }
                if (!event) {
                  return res.status(404).send({
                    message: "No hay temas ",
                  });
                }

                return res.status(200).send({
                  status: "success",
                  event: event,
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
      Event.findOneAndUpdate(
        { "comments._id": commentId },
        {
          $set: {
            "comments.$.content": params.content,
          },
        },
        { new: true },
        (err, eventUpdated) => {
          if (err) {
            return res.status(400).send({
              message: "Error en la petición",
            });
          }

          if (!eventUpdated) {
            return res.status(400).send({
              message: "No se ha encontrado el tema",
            });
          }
          //devolver datos
          return res.status(200).send({
            message: "Update comment",
            event: eventUpdated,
          });
        }
      );
    }
  },
  delete: function(req, res) {
    //Sacar el id del event y del comentario a borrar
    var eventId = req.params.eventId;
    var commentId = req.params.commentId;
    //Buscar el event
    Event.findById(eventId, (err, event) => {
      if (err) {
        return res.status(400).send({
          message: "Error en la petición",
        });
      }

      if (!event) {
        return res.status(400).send({
          message: "No se ha encontrado el tema",
        });
      }

      //Seleccionar el subdocumento (comentario)
      var comment = event.comments.id(commentId);
      //Borrar el comentario
      if (comment) {
        comment.remove();
        //Guardar el event
        event.save((err) => {
          if (err) {
            return res.status(400).send({
              message: "Error en la petición",
            });
          }
          Event.findById(event._id)
              .populate("user")
              .populate("comments.user")
              .exec((err, event) => {
                if (err) {
                  return res.status(400).send({
                    message: "error",
                  });
                }
                if (!event) {
                  return res.status(404).send({
                    message: "No hay temas ",
                  });
                }

                return res.status(200).send({
                  status: "success",
                  event,
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
