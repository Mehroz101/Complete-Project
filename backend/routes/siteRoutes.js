const {
  getSiteSetting,
  getSiteSettings,
} = require("../controllers/siteController");

const express = require("express");
const router = express.Router();

router.get("/getsitsetting", getSiteSetting);
router.get("/getsitsettings", getSiteSettings);

module.exports = router;
