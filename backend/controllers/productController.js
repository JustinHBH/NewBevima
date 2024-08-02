// controllers/productController.js
const db = require('../db');

const getAllProducts = (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE product_id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(result[0]);
      }
    }
  });
};

const createProduct = (req, res) => {
  const { product_name, price, category_name, description, quantity, image_url } = req.body;
  const sql = 'INSERT INTO products (product_name, price, category_name, description, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [product_name, price, category_name, description, quantity, image_url], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Product created successfully' });
    }
  });
};


const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { product_name, price, category_name, description, quantity, image_url } = req.body;
  const sql = 'UPDATE products SET product_name = ?, price = ?, category_name = ?, description = ?, quantity = ?, image_url = ? WHERE product_id = ?';
  db.query(sql, [product_name, price, category_name, description, quantity, image_url, productId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Product updated successfully' });
    }
  });
};


const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const sql = 'DELETE FROM products WHERE product_id = ?';
  db.query(sql, [productId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
