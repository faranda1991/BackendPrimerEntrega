const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsController.obtenerTodosLosProductos);
productsRouter.get('/:pid', productsController.obtenerProductoPorId);
productsRouter.post('/', productsController.agregarProducto);
productsRouter.put('/:pid', productsController.actualizarProducto);
productsRouter.delete('/:pid', productsController.eliminarProducto);

module.exports = productsRouter;
