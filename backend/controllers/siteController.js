const Setting = require("../models/Settings");

const siteNameUpdateByAdmin = async (req, res) => {
  const { sitename } = req.body;

  if (!sitename) {
    return res.status(400).json({
      success: false,
      message: "Site name is required",
    });
  }

  try {
    // Find and update the site name
    const site = await Setting.findOneAndUpdate(
      {}, // Assuming there's only one settings document
      { siteName: sitename }, // Update the site name
      { new: true, upsert: true } // Return the updated document; create if not found
    );

    if (site) {
      console.log("Updated site:", site);
      return res.status(200).json({
        success: true,
        message: "Site name updated successfully",
        site,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Settings document not found",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { siteNameUpdateByAdmin };
