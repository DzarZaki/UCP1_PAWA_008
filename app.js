const express = require('express');
const poolRoutes = require('./routes/poolRoutes');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const db = require('./Database/db');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const { isAuthenticated } = require('./middlewares/middleware.js');

app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Routes
app.use('/pools', poolRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
