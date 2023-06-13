
const db = require('../models/db');

class Order {
  static create(userId, orderData) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO orders (user_id, column1, column2) VALUES (?, ?, ?, ...)';
      const values = [userId, orderData.column1, orderData.column2 ];
      db.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  }
  static getOrders(username) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT no_of_order as numOrder, description, new_request as newRequest, accepted, in_process as inProcess, finished FROM orders WHERE email_id = ?';
      db.query(query, [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          // column names are alias and used below
          const {numOrders, description, newRequest, accepted, inProcess, finished } = results[0];
          const orderData = {
            numOrders: numOrders,
            description: description,
            newRequest: newRequest,
            accepted: accepted,
            inProcess: inProcess,
            finished: finished
            
          };
          resolve(orderData);
        }
      });
    });
  }
}

module.exports = Order;
