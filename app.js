const express = require('express');
const app = express();


const path = require('path');

//defaut directory
app.set('views', path.join(__dirname, 'views'));


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up routes
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
