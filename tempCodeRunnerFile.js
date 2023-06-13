const db = require('./models/db');
const query = "SELECT EXISTS (SELECT 1 FROM users WHERE email_id = 'abc@d.com')";
const ans = db.query(query);
console.log(ans);