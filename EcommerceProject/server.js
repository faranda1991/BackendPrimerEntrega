const express = require('express');
const productsRoutes = require('./routes/productsRouter');
const cartsRoutes = require('./routes/cartsRouter');
const app = express();
const port = 8080;

app.use(express.json());
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
