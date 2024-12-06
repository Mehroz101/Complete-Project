const Setting = require("../models/Settings");

const siteNameUpdateByAdmin = async (req, res) => {
  const { sitename } = req.body;
  try {
    const site = await Setting.findOneAndUpdate(
      { sitename: sitename },
      { sitename: sitename },
      { new: true }
    );
    if (site) {
      res.status(200).json({
        success: true,
        message: "Site name updated successfully",
        site,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { siteNameUpdateByAdmin };
