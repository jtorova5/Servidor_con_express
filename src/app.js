const express = require('express');
const ProductManager = require('./ProductManager');

const app = express()
const port = 8080

const productManager = new ProductManager("./data.json");
productManager.initialize();

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = limit === undefined ? await productManager.getProducts() : await productManager.getProducts(limit);
  res.send(products)
})

app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  const products = await productManager.getProductById(id);
  const response = products !== undefined ? products : `<div>Product with id ${id} not found</div>`
  res.send(response)
})

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})