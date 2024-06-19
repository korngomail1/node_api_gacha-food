const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql2'); 
const PORT = 3000;
const cors = require('cors');
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 
app.use(cors());
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
    }else{
        console.log('connected successfully');
    }
    
})

app.get('/api/fillter', (req, res) => {
    const query = 'SELECT * FROM material ';

    connection.query(query, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            const data = {
                meat: results.filter(item => item.type === 'meat'),
                vegetable: results.filter(item => item.type === 'vegetable')
            };
            res.status(200).json(data);
        }
    });
})


//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});