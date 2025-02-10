const express = require('express');
const { faker } = require('@faker-js/faker');


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("Hola mi serverdr en rexpres")
})

app.get('/nueva-ruta', (req, res) => {
  res.send("Hola soy una nueva ruta")
})

app.get('/productos', (req, res) => {

  const { size } = req.query;
  const productos = [];
  if(size){
    for (let index = 0; index < size; index++) {
      productos.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.urlPicsumPhotos()
      })

    }
  }
  res.json(productos)
})
app.get('/productos/filter', (req, res) => {
  res.send( "soy un filter")
})

app.get('/productos/:id', (req, res) => {
  // destructuracion
  const { id } = req.params;
  res.json({
    id,
    name: 'Producto 2',
    price: 12
  })
})


app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json([
      {
        limit,
        offset
      }
    ])
  } else {
    res.send("No hay parametros")
  }
})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  })
})

app.listen(port, () => {
  console.log('mi port ' + port);
});



// express es un constructor
// Representational State Transfer REST
// Get, Put, Post, Delete
