const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');

// Seting view engine
app.set('view engine', 'ejs');

// setting views directory
app.set('views', path.join(__dirname, 'views'));

//for parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
  secret: 'secret-key-123',
  resave: false,
  saveUninitialized: false
}));


// Setting up routes
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

// controllers
const loginController = require('./controllers/loginController');
const dashboardController = require('./controllers/dashboardController');

// Routes
app.use(loginController);
app.use(dashboardController);


// direct routes
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
//app.use('/dashboard', dashboardRouter);



// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
