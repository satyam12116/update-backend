/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /records/{date}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get records by date
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: Date parameter in the format YYYY-MM-DD
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 * /records/of/last-week:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get records of the last week
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 * /records/of/last-month:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get records of the last month
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Bad Request
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */

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
