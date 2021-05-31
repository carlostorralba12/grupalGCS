//Creacion del servidor
'use strict'

//Requires
var express = require('express');
var bodyParser = require('body-parser');


//Ejecutar express
var app = express();

//Cargar archivos rutas
var cors = require('cors')
var userRoutes = require('./routes/user');
var topicRoutes = require('./routes/topic');
var commentRoutes = require('./routes/comment');
var commentEventRoutes = require('./routes/commentEvent');
var eventRoutes = require('./routes/event');
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())


//CORS
// Configurar cabeceras y cors



//Resscribir Rutas
app.use('/api', userRoutes);
app.use('/api',topicRoutes);
app.use('/api',commentRoutes);
app.use('/api', eventRoutes);
app.use('/api', commentEventRoutes);
//Ruta de prueba
app.get('/prueba', (req, res)=>{
    return res.status(200).send({
        message:'Hola mundo'
    })
})

//Exportar modulo
module.exports = app;