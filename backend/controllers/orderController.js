const db = require('../db'); 
const orderController = {
    createOrder: async (req, res) => {
        const { userId, customerName, customerEmail, customerAddress, phone, items, totalAmount, paymentMethod, orderStatus = 'Chờ xác nhận' } = req.body;
        const query = `
            INSERT INTO order_history (user_id, customer_name, customer_email, customer_address, phone, items, total_amount, payment_method, order_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        try {
            const result = await db.query(query, [
                userId, customerName, customerEmail, customerAddress, phone, JSON.stringify(items), totalAmount, paymentMethod, orderStatus
            ]);
            res.status(201).send({ message: 'Order created successfully', orderId: result.insertId });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).send({ message: 'Error creating order', error: error.message });
        }
    },

    getAllOrder: async (req, res) => {
        try {
            const result = await new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM order_history';
                db.query(sql, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });

            if (result.length === 0) {
                return res.status(404).json({ message: 'No orders found' });
            }

            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching orders', error: err.message });
        }
    },

    getOrderByDate : (req, res) => {
        const { date } = req.query; 
        const formattedDate = `${date}%`; 
        
        const sql = 'SELECT * FROM order_history WHERE order_status = "Đã hoàn thành" AND created_at LIKE ?';
        db.query(sql, [formattedDate], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json(result);
        });
    },
    
    getOrderById: async (req, res) => {
        const { orderId } = req.params;
        const query = `
            SELECT * FROM order_history WHERE order_id = ?;
        `;
        try {
            const result = await db.query(query, [orderId]);
            if (result.length > 0) {
                res.status(200).send({ message: 'Order retrieved successfully', order: result[0] });
            } else {
                res.status(404).send({ message: 'Order not found' });
            }
        } catch (error) {
            console.error('Error retrieving order:', error);
            res.status(500).send({ message: 'Error retrieving order', error: error.message });
        }
    },

//     countOrdersByUserId: async (req, res) => {
//     const userId = req.params.userId; 
//     const query = `
//         SELECT COUNT(*) AS orderCount FROM order_history WHERE user_id = ?;
//     `;
  
//     try {
        
//         const results = await db.query(query, [userId]);
//         console.log("Results:", results);  

//         // Normally, mysql2/promise returns results as [rows, fields]
//         if (results && results[0] && results[0].length > 0) {
//             const orderCount = results[0][0].orderCount;
//             res.status(200).send({ message: 'Count retrieved successfully', count: orderCount });
//         } else {
//             res.status(404).send({ message: 'No orders found for this user' });
//         }
//     } catch (error) {
//         console.error('Error counting orders:', error);
//         res.status(500).send({ message: 'Error counting orders', error: error.message });
//     }
// },

     getOrderHistory : async (req, res) => {
        const userId = req.params.userId;
        try {
            const result = await new Promise((resolve, reject) => {
              const sql = 'SELECT * FROM order_history WHERE user_id = ?';
              db.query(sql, [userId], (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              });
            });
        
            if (result.length === 0) {
              return res.status(404).json({ message: 'No orders found for this user' });
            }
        
            res.json(result);  
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching order history' });
        }
    },

    updateOrderbyId: async (req, res) => {
        const orderId = req.params.orderId;  
        const { status } = req.body; 
        const query = `
            UPDATE order_history SET order_status = ? WHERE order_id = ?;
        `;
        try {
            await db.query(query, [status, orderId]);
            res.send({ message: 'Order updated successfully' });
        } catch (error) {
            console.error(error); 
            res.status(500).send({ message: 'Error updating order' });  
    }
},
    
    

    deleteOrder: async (req, res) => {
        const { orderId } = req.params;
        const query = `
            DELETE FROM order_history WHERE order_id = ?;
        `;
        try {
            await db.query(query, [orderId]);
            res.send({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Error deleting order', error });
        }
    }
};

module.exports = orderController;
