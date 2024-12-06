const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  withdrawRequest,
  getWithdrawRequest,
  allEarnings,
  acceppaytbyadmin,
  rejectpaytbyadmin,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/request", authenticateToken, withdrawRequest);
router.get("/get", authenticateToken, getWithdrawRequest);
router.get("/allearnings", authenticateToken, allEarnings);
router.post("/acceppaytbyadmin", authenticateToken, acceppaytbyadmin);
router.post("/rejectpaytbyadmin", authenticateToken, rejectpaytbyadmin);
// router.get("/braintee/token", braintreeTokenController);
// router.post(
//   "/braintree/payment",
//   authenticateToken,
//   braintreePaymentController
// );
module.exports = router;
