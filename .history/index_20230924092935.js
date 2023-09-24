const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sys',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Fetch records for a specific date
app.get('/records/:date', (req, res) => {
    const date = req.params.date;
    const query = 'SELECT * FROM records WHERE date = ?';
    db.query(query, [date], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });
  
  // Fetch records for the last week
  app.get('/records/of/last-week', (req, res) => {
    const lastWeekStart = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
    const lastWeekEnd = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
    const query = 'SELECT * FROM records WHERE date >= ? AND date <= ?';
    db.query(query, [lastWeekStart, lastWeekEnd], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });
  
  // Fetch records for the last month
  app.get('/records/last-month', (req, res) => {
    const lastMonthStart = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
    const lastMonthEnd = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
    const query = 'SELECT * FROM records WHERE date >= ? AND date <= ?';
    db.query(query, [lastMonthStart, lastMonthEnd], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
