const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const productsController = {
  obtenerTodosLosProductos: (req, res) => {
    const products = JSON.parse(fs.readFileSync('./data/productos.json'));
    res.json(products);
  },

  obtenerProductoPorId: (req, res) => {
    const { pid } = req.params;
    const products = JSON.parse(fs.readFileSync('./data/productos.json'));
    const product = products.find(p => p.id === pid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  },

  agregarProducto: (req, res) => {
    const id = uuidv4();
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = { id, title, description, code, price, status, stock, category, thumbnails };
    const products = JSON.parse(fs.readFileSync('./data/productos.json'));
    products.push(newProduct);
    fs.writeFileSync('./data/productos.json', JSON.stringify(products));
    res.json(newProduct);
  },

  actualizarProducto: (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const products = JSON.parse(fs.readFileSync('./data/productos.json'));
    const productIndex = products.findIndex(p => p.id === pid);
    if (productIndex > -1) {
      const product = products[productIndex];
      const updatedProduct = { 
        ...product,
        title: title !== undefined ? title : product.title,
        description: description !== undefined ? description : product.description,
        code: code !== undefined ? code : product.code,
        price: price !== undefined ? price : product.price,
        status: status !== undefined ? status : product.status,
        stock: stock !== undefined ? stock : product.stock,
        category: category !== undefined ? category : product.category,
        thumbnails: thumbnails !== undefined ? thumbnails : product.thumbnails
      };
      products[productIndex] = updatedProduct;
      fs.writeFileSync('./data/productos.json', JSON.stringify(products));
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  },

  eliminarProducto: (req, res) => {
    const { pid } = req.params;
    const products = JSON.parse(fs.readFileSync('./data/productos.json'));
    const productIndex = products.findIndex(p => p.id === pid);
    if (productIndex > -1) {
      products.splice(productIndex, 1);
      fs.writeFileSync('./data/productos.json', JSON.stringify(products));
      res.json({ message: 'Producto Borrado con exito' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  }
}

module.exports = productsController;
