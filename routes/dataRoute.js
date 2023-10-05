const express = require("express");
const {
  getByDate,
  getByWeek,
  getByMonth,
  registerUser,
  loginUser,
} = require("../controller/dataController");
const authenticateToken =require("../middleware/jwtMiddleware");
const router = express.Router();

router.route("/records/:date").get(authenticateToken,getByDate);
router.route("/records/of/last-week").get(authenticateToken,getByWeek);
router.route("/records/of/last-month").get(authenticateToken,getByMonth);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
