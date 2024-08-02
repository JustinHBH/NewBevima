// controllers/cartController.js
const db = require('../db');

const cartController = {
  addToCart: async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {

     const productExistsQuery = 'SELECT * FROM products WHERE product_id = ?';
     const product = await db.query(productExistsQuery, [product_id]);

     
    if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
     }

    if (product[0].stock < quantity) {
    return res.status(400).json({ message: 'Insufficient stock' });
    }

      const existQuery = 'SELECT * FROM shopping_carts WHERE user_id = ? AND product_i1d = ?';
      const exist = await db.query(existQuery, [user_id, product_id]);

      if (exist.length > 0) {
        const updateQuery = 'UPDATE shopping_carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?';
        await db.query(updateQuery, [quantity, user_id, product_id]);
      } else {
        const insertQuery = 'INSERT INTO shopping_carts (user_id, product_id, quantity) VALUES (?, ?, ?)';
        await db.query(insertQuery, [user_id, product_id, quantity]);
      }

      res.status(200).json({ message: 'Successfully added to cart' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateCartQuantity: async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
      const updateQuery = 'UPDATE shopping_carts SET quantity = ? WHERE user_id = ? AND product_id = ?';
      await db.query(updateQuery, [quantity, user_id, product_id]);
      res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeFromCart: async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
      const deleteQuery = 'DELETE FROM shopping_carts WHERE user_id = ? AND product_id = ?';
      await db.query(deleteQuery, [user_id, product_id]);
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getCart: async (req, res) => {
    const { user_id } = req.params;
    try {
      const selectQuery = 'SELECT * FROM shopping_carts WHERE user_id = ?';
      const cartItems = await db.query(selectQuery, [user_id]);
      res.status(200).json(cartItems);
    } catch (error) {
      console.error('Error getting cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = cartController;
