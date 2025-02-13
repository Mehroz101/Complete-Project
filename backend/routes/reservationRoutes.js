const express = require("express");
const {
  createCustomReservation,
  createReservation,
  getReservation,
  cancelReservation,
  confirmReservation,
  getReservationData,
  getUserReservation,
  getAllReservation,
  reservedReservation,
  getSpaceSpecificReservations,
  postReview,
  getReservationReview,
  braintreeTokenController,
  braintreePaymentController,
  allReservation,
  confirmReservationByAdmin,
  cancelReservationByAdmin,
  refundReservationByAdmin
} = require("../controllers/reservationController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();
router.post(
  "/createCustomReservation",
  authenticateToken,
  createCustomReservation
);
router.post("/createReservation", authenticateToken, createReservation);
router.post("/postreview", authenticateToken, postReview);
router.get("/get", authenticateToken, getReservation);
router.get("/getallreservation", getAllReservation);
router.get("/getuserreservation", authenticateToken, getUserReservation);
router.get("/get/:reservationId", authenticateToken, getReservationData);
router.get(
  "/getspacespecificreservation/:spaceId",
  getSpaceSpecificReservations
);
router.get("/getreservationreview/:reservationId", getReservationReview);
router.patch("/cancel", authenticateToken, cancelReservation);
router.patch("/confirm", authenticateToken, confirmReservation);
router.patch("/reserved", authenticateToken, reservedReservation);
router.get("/braintree/token", braintreeTokenController);
router.post(
  "/braintree/payment",
  authenticateToken,
  braintreePaymentController
);
router.get("/allreservations", authenticateToken, allReservation);
router.post("/cancelbyadmin", authenticateToken, cancelReservationByAdmin);
router.post("/confirmbyadmin", authenticateToken, confirmReservationByAdmin);
router.post("/refundbyadmin", authenticateToken, refundReservationByAdmin);
module.exports = router;
