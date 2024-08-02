const db = require('../db'); 



const getProfileByUserId = async (req, res) => {
const userId = req.params.id; 
  try {
    const result = await new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM profile WHERE user_id = ?';
      db.query(sql, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (result.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateProfileByUserId = async (req, res) => {
  const userId = req.params.id;
  const { profile_description, fullname, address, phone, birthdate } = req.body;

  try {
    const result = await new Promise((resolve, reject) => {
      const sql = 'UPDATE profile SET profile_description = ?, fullname = ?, address = ?, phone = ?, birthdate = ? WHERE user_id = ?';
      db.query(sql, [profile_description, fullname, address, phone, birthdate, userId], (err, results) => {
        if (err) {
          reject(err);
        } else if (results.affectedRows === 0) {
          reject(new Error('Profile not found'));
        } else {
          resolve(results);
        }
      });
    });

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    if (err.message === 'Profile not found') {
      res.status(404).json({ message: err.message });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = {
  updateProfileByUserId,
  getProfileByUserId,
};
