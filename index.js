const express = require('express');
const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./middleware/error.handler')
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hola mi serverdr en rexpres")
})

app.get('/nueva-ruta', (req, res) => {
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
