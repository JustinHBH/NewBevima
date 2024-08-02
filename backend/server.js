//server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const otpRoutes = require('./routes/otpRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const profileRoutes = require('./routes/profileRoutes');
const orderRoutes = require('./routes/orderRoutes');

const db = require('./db');


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/otp', otpRoutes);
app.use('/cart', cartRoutes);
app.use('/categories', categoryRoutes);
app.use('/profile', profileRoutes);
app.use('/order', orderRoutes);


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});




app.listen(port, () => {
  console.log(`Đang chạy ở cổng ${port}`);
});
