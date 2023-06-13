const db = require('./db');

// Model method to create a new laundry request in the database
exports.createLaundryRequest = (user, pickupDate, clothesKg, clothType, remark, callback) => {
  const query = 'INSERT INTO requests (user, pickupDate, clothesKg, clothType, remark) VALUES (?, ?, ?, ?, ?); UPDATE orders SET new_request = new_request + 1 WHERE email_id = ?;';
  
  const values = [user, pickupDate, clothesKg, clothType, remark, user];
  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
