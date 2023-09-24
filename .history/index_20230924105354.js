const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const db=require('./database/mysqlDB');
const moment = require('moment'); // for date manipulation
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require("./routes/productRoutes");
app.use(bodyParser.json());
app.use(cors());

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

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
  app.get('/records/of/last-month', (req, res) => {
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

