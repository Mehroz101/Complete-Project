const Space = require("../models/space"); // Import your Space model
const fs = require("fs");
const path = require("path");
const review = require("../models/Review");
const emitReservationMessage = require("../utils/emitReservationMessage");
const Setting = require("../models/Settings");
const cloudinary = require("cloudinary").v2;
// const io = require("socket.io"); // Attach to your server
// Get the Socket.io instance from the app
// Create a new space
const createSpace = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      //console.log("User not found");
      return res.status(401).json();
    }
    //console.log(req);

    const {
      title,
      short_description,
      description,
      address,
      city,
      limit,
      country,
      features,
      longitude,
      latitude,
      per_hour,
      per_day,
    } = req.body;

    // Check if required fields are missing
    if (
      !title ||
      !short_description ||
      !description ||
      !address ||
      !city ||
      !country ||
      !limit ||
      !longitude ||
      !latitude ||
      !per_hour ||
      !per_day
    ) {
      return res.status(400).json();
    }
// Generate the next spaceID
const lastspace = await Space.findOne({ spaceID: { $exists: true } }).sort({ spaceID: -1 });

const nextspaceID = lastspace && lastspace.spaceID ? lastspace.spaceID + 1 : 1;
    const newSpace = new Space({
      userId,
      title,
      spaceID:nextspaceID,
      short_description,
      description,
      address,
      city,
      limit,
      country,
      features: JSON.parse(features),
      longitude,
      latitude,
      per_hour,
      per_day,
      images: req.files.map((file) => file.filename), // Save the file paths
    });

    const data = await newSpace.save();
    const io = req.app.get("io");

    await emitReservationMessage(
      io,
      userId,
      userId,
      "spaceUpdated",
      "",
      "New space is live now"
    );
    return res.status(201).json({ data });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json();
  }
};
const showSpace = async (req, res) => {
  try {
    const user = req.user.id;
    //console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const spaces = await Space.find({ userId: user });
    if (spaces.length === 0) {
      return res.status(404).json();
    }

    return res.status(200).json({ data: spaces });
  } catch (error) {
    // console.error("Error fetching spaces:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const toggleSpaceStatus = async (req, res) => {
  try {
    const { spaceId } = req.body;
    const userId = req.user.id;
    // console.log("user ID:", userId);

    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }

    // Toggle the state
    space.state = space.state === "active" ? "deactivated" : "active";
    const io = req.app.get("io");
    await emitReservationMessage(
      io,
      userId,
      userId,
      "spaceUpdated",
      "",
      `Space is ${space.state === "active" ? "active" : "deactived"} now`
    );
    await space.save();

    res.status(200).json({ message: "Space status updated", data: space });
  } catch (error) {
    console.error("Error toggling space status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getspacedetail = async (req, res) => {
  const { spaceId } = req.params;
  //console.log(spaceId);
  try {
    const space = await Space.findById(spaceId);
    if (space) {
      return res.status(201).json({ space });
    }
  } catch (error) {
    //console.log(error.message);
  }
};

const updateSpaceDetails = async (req, res) => {
  const userId = req.user.id;
  const { spaceId } = req.params;
  const {
    title,
    short_description,
    description,
    address,
    city,
    limit,
    country,
    features,
    longitude,
    latitude,
    per_hour,
    per_day,
    removeImg,
  } = req.body;

  try {
    // Find space by ID
    const space = await Space.findById(spaceId);
    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }

    // Update basic fields
    space.title = title || space.title;
    space.short_description = short_description || space.short_description;
    space.description = description || space.description;
    space.address = address || space.address;
    space.city = city || space.city;
    space.limit = limit || space.limit;
    space.country = country || space.country;
    space.features = features ? JSON.parse(features) : space.features;
    space.longitude = longitude || space.longitude;
    space.latitude = latitude || space.latitude;
    space.per_hour = per_hour || space.per_hour;
    space.per_day = per_day || space.per_day;

    // Handle image removal (Cloudinary)
    if (removeImg && removeImg.length > 0) {
      for (const img of removeImg) {
        const imageObj = space.images.find((i) => i.public_id === img);
        if (imageObj) {
          try {
            await cloudinary.uploader.destroy(imageObj.public_id);
          } catch (err) {
            console.error(`Failed to delete image ${img}:`, err);
          }
        }
      }
      // Remove from DB
      space.images = space.images.filter(
        (img) => !removeImg.includes(img.public_id)
      );
    }

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const uploadedImages = [];

      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "spaces" }, // optional: organize uploads
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(file.buffer);
        });

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      space.images = [...space.images, ...uploadedImages];
    }

    // Save updated space
    const response = await space.save();

    const io = req.app.get("io");
    await emitReservationMessage(
      io,
      userId,
      userId,
      "spaceUpdated",
      "",
      `Space detail updated successfully`
    );

    res
      .status(201)
      .json({ message: "Space updated successfully", response });
  } catch (error) {
    console.error("Error updating space details:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSpace = async (req, res) => {
  const { spaceId } = req.params;
  try {
    const space = await Space.findByIdAndDelete(spaceId);
    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }
    const io = req.app.get("io");

    await emitReservationMessage(
      io,
      userId,
      userId,
      "spaceUpdated",
      "",
      `Space deleted successfully`
    );

    res.status(200).json({ message: "Space deleted successfully" });
  } catch (error) {
    console.error("Error deleting space:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
const getallspaces = async (req, res) => {
  try {
    // const user = req.user.id;
    // if (!user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    const spaces = await Space.find({ state: "active" });
    if (spaces.length === 0) {
      return res.status(404).json();
    }

    return res.status(201).json({ data: spaces });
  } catch (error) {
    // console.error("Error fetching spaces:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const getspacedetailforreservation = async (req, res) => {
  const { spaceId } = req.params;

  try {
    const spaces = await Space.findById(spaceId);
    if (spaces.length === 0) {
      return res.status(404).json();
    }

    return res.status(200).json({ data: spaces });
  } catch (error) {
    // console.error("Error fetching spaces:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getSpaceReviews = async (req, res) => {
  const { spaceId } = req.params;
  try {
    const response = await review
      .find({ spaceId: spaceId, status: "approved" })
      .populate("userId", "fName");
    res.status(201).json(response);
  } catch (error) {
    //console.log(error.message)
  }
};
const getAllReviews = async (req, res) => {
  try {
    const response = await review.find({ status: "approved" });
    res.status(201).json(response);
  } catch (error) {
    //console.log(error.message)
  }
};
const getAllReviewsByAdmin = async (req, res) => {
  try {
    const response = await review.find().populate("spaceId");
    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const toggleSpaceStatusByAdmin = async (req, res) => {
  try {
    const { spaceId } = req.body;

    const space = await Space.findById(spaceId);
    if (!space) {
      return res
        .status(404)
        .json({ success: false, message: "Space not found" });
    }

    // Toggle the state
    space.state = space.state === "active" ? "deactivated" : "active";

    await space.save();

    res.status(200).json({ success: true, message: "Space status updated" });
  } catch (error) {
    // console.error(success: false,"Error toggling space status:");
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const getallspacesbyadmin = async (req, res) => {
  try {
    // console.log("getallspacesbyadmin");
    const spaces = await Space.find();
    if (spaces.length === 0) {
      return res.status(404).json();
    }

    return res.status(201).json({ data: spaces });
  } catch (error) {
    // console.error("Error fetching spaces:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const RejectReviewByAdmin = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const response = await review.findByIdAndUpdate(reviewId, {
      status: "rejected",
    });
    res.status(201).json({
      success: true,
      message: "Review rejected successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const AcceptReviewByAdmin = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const response = await review.findByIdAndUpdate(reviewId, {
      status: "approved",
    });
    res.status(201).json({
      success: true,
      message: "Review approeved successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const IsFavoriteByAdmin = async (req, res) => {
  try {
    const { reviewId } = req.body;

    // Find the review by ID to get the current value of isFavorite
    const existingReview = await review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Toggle the isFavorite value
    const isFavorite = !existingReview.isFavorite;
    const updatedReview = await review.findByIdAndUpdate(
      reviewId,
      { isFavorite },
      { new: true } // Return the updated document
    );

    // Update the settings model
    const settings = await Setting.findOne({});
    if (isFavorite) {
      // Add the review ID to reviewsToShow if not already present
      if (!settings.reviewsToShow.includes(reviewId)) {
        settings.reviewsToShow.push(reviewId);
      }
    } else {
      // Remove the review ID from reviewsToShow if it exists
      settings.reviewsToShow = settings.reviewsToShow.filter(
        (id) => id.toString() !== reviewId
      );
    }
    await settings.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      updatedReview,
    });
  } catch (error) {
    console.error("Error updating review:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createSpace,
  showSpace,
  toggleSpaceStatus,
  getspacedetail,
  updateSpaceDetails,
  deleteSpace,
  getallspaces,
  getspacedetailforreservation,
  getSpaceReviews,
  getAllReviews,
  toggleSpaceStatusByAdmin,
  getallspacesbyadmin,
  getAllReviewsByAdmin,
  RejectReviewByAdmin,
  AcceptReviewByAdmin,
  IsFavoriteByAdmin,
};
