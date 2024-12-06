const express = require("express");
const {
  updateaccountinformation,
  showAccountInformation,
  allusers,
  edituser,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.put(
  "/updateaccountinformation",
  authenticateToken,
  updateaccountinformation
);
// router.post("/addusers", authenticateToken, addUser);
router.get(
  "/showAccountInformation",
  authenticateToken,
  showAccountInformation
);
router.get("/allusers", authenticateToken, allusers);
router.post("/edituser", authenticateToken, edituser);
module.exports = router;
