const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  getAllReviewsByAdmin,
  RejectReviewByAdmin,
  AcceptReviewByAdmin,
  IsFavoriteByAdmin,
} = require("../controllers/spaceController");

const router = express.Router();

router.get("/allreviews", authenticateToken, getAllReviewsByAdmin);
router.post("/rejectbyadmin", authenticateToken, RejectReviewByAdmin);
router.post("/approvebyadmin", authenticateToken, AcceptReviewByAdmin);
router.post("/isfavoritebyadmin", authenticateToken, IsFavoriteByAdmin);

module.exports = router;
