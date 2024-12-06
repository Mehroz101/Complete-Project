const express = require("express");
const {
  AdminLogin,
  checkLogin,
  changepassword,
  AdminSignup,
} = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const { siteNameUpdateByAdmin } = require("../controllers/siteController");

const router = express.Router();

router.post("/login", AdminLogin);
router.post("/signup", AdminSignup);
router.post("/checklogin", authenticateToken, checkLogin);
router.post("/changepassword", authenticateToken, changepassword);
router.post("/sitename", authenticateToken, siteNameUpdateByAdmin);

module.exports = router;
