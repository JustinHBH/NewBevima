//categoryController.js
const db = require('../db');

const getAllcategories = (req, res) => {
    const sql = 'SELECT * FROM product_categories';
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result);
      }
    });
  };

  module.exports = {
    getAllcategories,
  };
  