const bcrypt = require('bcrypt');

const db = require('./db');

class User {
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email_id = ?', [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static comparePasswords(password, hashedPassword) {
    //using bcryt to compare the hashedPassword and returning the same
    return bcrypt.compare(password, hashedPassword);

  }


  static findName(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT full_name FROM users WHERE email_id = ?', [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const fName = results[0];
          resolve(fName);
        }
      });
    });
  }



  static create(name, password, email, phoneNumber) {
    return new Promise((resolve, reject) => {
      //creating hashedPassword and storing it the database.s
      bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) {
          reject(error);
        } else {
          db.query(
            'INSERT INTO users (email_id, full_name, password, phone_number) VALUES (?, ?, ?, ?); INSERT INTO orders (email_id, no_of_order, new_request, accepted, in_process, finished) VALUES (?, ?, ?, ?, ?, ?)',
            [email, name, hashedPassword, phoneNumber, email, 0, 0, 0, 0, 0],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            }
          );
        }
      });
    });
  }



  static updatePassword(userId, newPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(newPassword, 10, (error, hashedPassword) => {
        if (error) {
          reject(error);
        }
        else {
          const sql = 'UPDATE users SET password = ? WHERE email_id = ?';
          db.query(sql, [hashedPassword, userId], (error, result) => {
            if (error) {
              reject(error);
            }
            else {
              resolve(result);
            }
          });
        }
      });


    });

  }






  // Update user's password by token
  static updatePasswordByToken(token, newPassword) {
    return new Promise((resolve, reject) => {

      bcrypt.hash(newPassword, 10, (error, hashedPassword) => {
        if (error) {
          reject(error);
        }
        else {
          // Execute the SQL query to update the user's password
          const sql = `UPDATE users SET password = ? WHERE reset_token = ?`;
          db.query(sql, [hashedPassword, token], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }

      });

    });
  }


  static updateResetToken(id, token) {
    const query = 'UPDATE users SET reset_token = ? WHERE email_id = ?';
    const values = [token, id];
    db.query(query, values);
  }

  static findByResetToken(token) {
    const query = 'SELECT * FROM users WHERE reset_token = ?';
    const values = [token];
    const [rows] = db.query(query, values);
    return rows[0] || null;
  }


  static clearResetToken(id) {
    const query = 'UPDATE users SET reset_token = NULL WHERE email_id = ?';
    const values = [id];
    db.query(query, values);
  }



  static validateToken(token) {
    return new Promise((resolve, reject) => {
      const query = `SELECT EXISTS (SELECT 1 FROM users WHERE reset_token = ?)`;
      db.query(query, [token], (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const exists = results[0][Object.keys(results[0])[0]] === 1;
        resolve(exists);
      });
    });
  }
}





module.exports = User;
