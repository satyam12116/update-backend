const moment = require("moment");
const mysql = require("mysql2");
const db = require("../database/mysqlDB");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getByDate = (req, res) => {
  try {
    const date = req.params.date;
    const query = "SELECT * FROM records WHERE date = ?";
    db.query(query, [date], (err, results) => {
      res.json(results);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
const getByWeek = (req, res) => {
  try {
    const lastWeekStart = moment()
      .subtract(1, "weeks")
      .startOf("week")
      .format("YYYY-MM-DD");
    const lastWeekEnd = moment()
      .subtract(1, "weeks")
      .endOf("week")
      .format("YYYY-MM-DD");
    const query = "SELECT * FROM records WHERE date >= ? AND date <= ?";
    db.query(query, [lastWeekStart, lastWeekEnd], (err, results) => {
      res.json(results);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
const getByMonth = async (req, res) => {
  try {
    const lastMonthStart = moment()
      .subtract(1, "months")
      .startOf("month")
      .format("YYYY-MM-DD");
    const lastMonthEnd = moment()
      .subtract(1, "months")
      .endOf("month")
      .format("YYYY-MM-DD");
    const query = "SELECT * FROM records WHERE date >= ? AND date <= ?";
    db.query(query, [lastMonthStart, lastMonthEnd], (err, results) => {
      res.json(results);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
const registerUser=async(req,res)=>{
  try{
    const { username, password } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: 'Error hashing password' });
      return;
    }

    // Store the username and hashed password in the users table
    const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error registering user' });
        return;
      }
      res.json({ message: 'User registered successfully' });
    });
  });
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
const loginUser=async(req,res)=>{
  try{
    const { username, password } = req.body;

    // Retrieve the hashed password for the provided username
    const query = 'SELECT username, password FROM user WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error authenticating user' });
        return;
      }
  
      if (results.length === 0) {
        res.status(401).json({ error: 'Authentication failed' });
        return;
      }
  
      const { id, password: hashedPassword } = results[0];
  
      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
        if (err || !passwordMatch) {
          res.status(401).json({ error: 'Authentication failed' });
          return;
        }
  
        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ id, username }, 'your-secret-key', { expiresIn: '1h' });
  
        // Send the token in the response
        res.json({ token });
      });
    });
  }catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getByDate, getByWeek, getByMonth,registerUser,loginUser };
