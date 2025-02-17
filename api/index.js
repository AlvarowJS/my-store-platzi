const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {logErrors, errorHandler, boomErrorHandler} = require('./middleware/error.handler')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true)
    }
    else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))
app.get('/api', (req, res) => {
  res.send("Hola mi servidor en express")
})

app.get('/api/nueva-ruta', (req, res) => {
  res.send("Hola soy una nueva ruta")
})

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('mi port ' + port);
});



// express es un constructor
// Representational State Transfer REST
// Get, Put, Post, Delete
