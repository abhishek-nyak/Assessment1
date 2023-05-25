const bcrypt = require('bcrypt');

const db = require('./db');

class User {
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
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
  

  static create(username, password, email, phoneNumber) {
    return new Promise((resolve, reject) => {
        //creating hashedPassword and storing it to database.s
        bcrypt.hash(password, 10, (error, hashedPassword) => {
          if (error) {
            reject(error);
          } else {
            db.query(
              'INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)',
              [username, hashedPassword, email, phoneNumber],
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


}


module.exports = User;
