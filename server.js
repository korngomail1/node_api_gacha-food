const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql2');
const { connect } = require('http2');
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

//create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gacha_db'
});

//connect database
connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('connected successfully');
}) 

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});