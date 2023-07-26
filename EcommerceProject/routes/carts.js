const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.post('/', (req, res) => {
  const id = uuidv4(); 
  const newCart = { id, products: [] };
  const carts = JSON.parse(fs.readFileSync('./data/carrito.json', 'utf-8'));
  carts.push(newCart);
  fs.writeFileSync('./data/carrito.json', JSON.stringify(carts, null, 2), 'utf-8');
  res.status(201).json({ message: 'Carrito creado con exito', id });
});

router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const carts = JSON.parse(fs.readFileSync('./data/carrito.json', 'utf-8'));
  const cart = carts.find(c => c.id === cid);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const carts = JSON.parse(fs.readFileSync('./data/carrito.json', 'utf-8'));
  const cartIndex = carts.findIndex(c => c.id === cid);
  
  if (cartIndex !== -1) {
    const productInCart = carts[cartIndex].products.find(p => p.product === pid);
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      carts[cartIndex].products.push({ product: pid, quantity: 1 });
    }
    fs.writeFileSync('./data/carrito.json', JSON.stringify(carts, null, 2), 'utf-8');
    res.json({ message: 'Producto agregado al carrito satisfactoriamente', cid, pid });
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

module.exports = router;
