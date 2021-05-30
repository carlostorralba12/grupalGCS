'use strinct'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3000;
//He puesto estas configuraciones ya que tenia problemas a la hora de acutalizar usuario
//Me daba un error en el metodo findOneAndUpdate.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var url = 'mongodb+srv://gcs:gcs@cluster0.vopmu.mongodb.net/api_gcs?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {
        console.log('La conexion se ha realizado correctamente a la BD')

        //Crear servidor
        app.listen(port, () => {
            console.log('El servidor esta funcionando',port)
        });
    })
    .catch(error => console.log(error));