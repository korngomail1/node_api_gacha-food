const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gacha_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database successfully');
    }
});

const saveImages = (directoryPath) => {
    // Read the directory and filter image files
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory:', err);
        }

        // Filter image files based on their extensions
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
        });

        // Prepend '/images/' to each filename and insert into the database with type 'vegetable'
        const insertQuery = 'INSERT INTO material ( type,filename,) VALUES ?';
        const values = imageFiles.map(file => ['vegetable',`/images/${file}`]);

        connection.query(insertQuery, [values], (err, result) => {
            if (err) {
                console.error('Error inserting data into the database:', err);
            } else {
                console.log('Image file names inserted into the database successfully');
            }

            // Close the database connection after the insert operation
            connection.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                } else {
                    console.log('Database connection closed');
                }
            });
        });
    });
};

module.exports = saveImages;
