const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/mysqlDB");
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const dataRoute = require("./routes/dataRoute");


app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", dataRoute);

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
