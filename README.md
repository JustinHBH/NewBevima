
# 🛍️ Bevima – E-commerce Web App

Bevima is a full-stack e-commerce website where users can browse, search, and purchase drinks. The app features user registration, cart management, order tracking, and an admin dashboard for managing products, users, and statistics.

---

## 🧱 Features

### 👥 User Side
- Register / Login
- Browse & search products
- Add/remove items to cart
- Place orders
- Rate and comment on products
- View order history

### 🛠 Admin Side
- CRUD product management
- Manage users and orders
- Sales statistics (with charts)
- Add promotions and categories

---

## ⚙️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| ReactJS, Redux, Axios, Bootstrap, Chart.js | Node.js, Express | MySQL |

Also used: Cloudinary, Multer, PayPal API, PDF Export (`jspdf`, `@react-pdf/renderer`)

---

## 🗃️ Folder Structure

```bash
📦 client/         # React frontend
📦 server/
 ┣ 📂 routes/       # Express API routes (products, users, orders, etc.)
 ┣ 📜 db.js         # DB connection config
 ┣ 📜 server.js     # Entry point
 ┣ 📦 database/     # SQL script: `bevima.sql`
```

---

## 🖥️ How to Run

### 1. Clone & install dependencies:

```bash
git clone https://github.com/yourusername/bevima.git
cd bevima
npm install
```

### 2. Setup MySQL

- Import `bevima.sql` into your local MySQL
- Update DB credentials in `db.js` if needed

### 3. Start backend server:

```bash
cd backend
node server.js
```

### 4. Start frontend:

```bash
cd frontend
npm start
```

---

## 📚 Lessons Learned

- Full-stack integration using REST API
- State management with Redux
- File upload with Cloudinary and Multer
- Working with PayPal SDK and generating PDFs
- Admin dashboard design and role-based access

---

## 📄 License

This project is for learning purposes.

