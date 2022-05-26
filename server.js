const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Database Config
mongoose.connect(process.env.DATABASE_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true
});

// Dtabase Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(express.urlencoded({ extended:true} ));

// Controllers - Technically middleware
const userController = require('./contollers/users');
app.use('/users', userController);


// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`))