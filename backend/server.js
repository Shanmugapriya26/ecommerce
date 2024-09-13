const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db');  // Your existing database connection
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Configure session middleware
app.use(session({
  store: new pgSession({
    pool: pool, // Connection pool
    tableName: 'session', // Table to store session data
  }),
  secret: process.env.SESSION_SECRET || 'mysecret',  // Secret to sign the session ID cookie
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // In production, set secure to true to only send cookies over HTTPS
}));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
