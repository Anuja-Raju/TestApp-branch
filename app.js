const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this port if needed

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'your-mysql-host',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Signup API
app.post('/signup', (req, res) => {
  const userType = req.body.userType;
  const userId = req.body.userId;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // Insert user into the database
  const query = 'INSERT INTO users (userType, userId, password) VALUES (?, ?, ?)';
  db.query(query, [userType, userId, password], (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error.sqlMessage);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Signup successful' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
