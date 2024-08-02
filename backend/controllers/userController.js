const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const emailExists = async (email, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE email = ? AND user_id != ?';
        db.query(sql, [email, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
};

const usernameExists = (username, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE username = ? AND user_id != ?';
        db.query(sql, [username, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
};

const emailExistRegister = async (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT email FROM user WHERE email = ?';
        db.query(sql, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
};

const usernameExistRegister = async (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT username FROM user WHERE username = ?';
        db.query(sql, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
};


const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result);
    });
};

const getCustomers = (req, res) => {
    const sql = 'SELECT * FROM user WHERE role_name = "customer"';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result);
    });
};

const getCustomerByEmail = async (req, res) => {
    const { email } = req.query;
    console.log("Received email query:", email);  

    if (!email) {
        console.log("No email provided");
        return res.status(400).json({ error: 'Email parameter is required' });
    }

    const sql = 'SELECT * FROM user WHERE email = ? AND role_name = "customer"';
    db.query(sql, [email], (err, results) => {
        console.log("Database query executed");  
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log("Results length:", results.length);  
        if (results.length > 0) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ success: false, message: 'No customer found with that email' });
        }
    });
};

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;  
    if (!newPassword) {
        return res.status(400).json({ error: 'Mật khẩu là bắt buộc' });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const sql = 'UPDATE user SET password = ? WHERE email = ?';
        db.query(sql, [hashedPassword, email], (err, result) => {
            if (err) {
                console.error('Lỗi cơ sở dữ liệu:', err);
                return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Người dùng không tìm thấy' });
            }
            res.json({ message: 'Đặt lại mật khẩu thành công' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ error: 'Lỗi mã hóa mật khẩu' });
    }
};



const getAllStaff = (req, res) => {
    const sql = 'SELECT * FROM user WHERE role_name = "admin" OR role_name = "employee"';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result);
    });
};

const getStaffById = (req, res) => {
    const { id } = req.params; 
    const sql = 'SELECT * FROM user WHERE user_id = ? AND (role_name = "admin" OR role_name = "employee")';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        res.json(result[0]);
    });
};

const UpdateStaff = async (req, res) => {
    const { id } = req.params;
    const { username, email, role_name, password } = req.body;
    const existsEmail = await emailExists(email, id);
    const existsUsername = await usernameExists(username, id);

    if (existsEmail) {
        return res.status(400).json({ error: 'Email đã có người dùng' });
    }
    if (existsUsername) {
        return res.status(400).json({ error: 'Username đã được sử dụng' });
    }
    let sql = 'UPDATE user SET username = ?, email = ?, role_name = ?';
    let dataToUpdate = [username, email, role_name];

    if (password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        sql += ', password = ?'; 
        dataToUpdate.push(hashedPassword); 
    }
    sql += ' WHERE user_id = ?'; 
    dataToUpdate.push(id); 

    db.query(sql, dataToUpdate, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Nhân viên không tìm thấy' });
        }
        res.status(200).json({ message: 'Thông tin nhân viên đã được cập nhật thành công' });
    });
};

const getOneUser = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            delete user.password; 
            res.json(user);
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
};

const createCustomer = async (req, res) => {
    const { username, email, password } = req.body; 

    const existsEmail = await emailExists(email);
    const existsUsername = await usernameExists(username);
    if (existsEmail) {
        return res.status(400).json({ error: 'Email đã có người dùng' });
    }
    if (existsUsername) {
        return res.status(400).json({ error: 'Username đã được sử dụng' });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = 'INSERT INTO user (username, email, password, role_name) VALUES (?, ?, ?, ?)'; 
    db.query(sql, [username, email, hashedPassword, 'customer'], (err, result) => { 
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
};

const createStaff = async (req, res) => {
    const { username, email, password, role_name } = req.body;

    
    const existsEmail = await emailExists(email);
    const existsUsername = await usernameExists(username);
    if (existsEmail) {
        return res.status(400).json({ error: 'Email đã có người dùng' });
    }
    if (existsUsername) {
        return res.status(400).json({ error: 'Username đã được sử dụng' });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const sql = 'INSERT INTO user (username, email, password, role_name) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, email, hashedPassword, role_name], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
};

const deleteUserById = (req, res) => {
    const { id } = req.params; 
    const sql = 'DELETE FROM user WHERE user_id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
};


module.exports = {
    getAllUsers,
    getOneUser,
    createCustomer,
    createStaff,
    getStaffById,
    emailExistRegister,
    getCustomers,
    getAllStaff,
    UpdateStaff,
    deleteUserById,
    getCustomerByEmail,
    resetPassword
};
