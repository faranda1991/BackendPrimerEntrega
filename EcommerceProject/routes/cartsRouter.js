const express = require('express');
const cartsController = require('../controllers/cartsController');

const cartsRouter = express.Router();

cartsRouter.post('/', cartsController.crearCarrito);
cartsRouter.get('/:cid', cartsController.obtenerProductosDelCarrito);
cartsRouter.post('/:cid/product/:pid', cartsController.agregarProductoAlCarrito);

module.exports = cartsRouter;
