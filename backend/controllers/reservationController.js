const { default: mongoose } = require("mongoose");
const reservation = require("../models/Reservation");
const review = require("../models/Review");
const space = require("../models/Space");
const emitReservationMessage = require("../utils/emitReservationMessage");
const { ObjectId } = require("mongodb"); // or mongoose if you're using mongoose
const order = require("../models/OrderModel");
var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.Merchant_ID,
  publicKey: process.env.Public_Key,
  privateKey: process.env.Private_Key,
});
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).send(response);
      }
    });
  } catch (error) {}
};
const braintreePaymentController = async (req, res) => {
  try {
    const { reservartionId, totalPrice, nonce } = req.body;
    let newTranction = gateway.transaction.sale(
      {
        amount: totalPrice,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          const orders = new order({
            reservartionId,
            userId: req.user.id,
            totalAmount: totalPrice,
            status: "completed",
          }).save();
          res.status(200).send(result);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
const createCustomReservation = async (req, res) => {
  //console.log(req.user.id);
  //console.log(req.body);
  try {
    const userId = req.user.id;
    if (!userId) {
      //console.log("User not found");
      return res.status(401).json();
    }
    const {
      spaceId,
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      leaveTime,
      arrivalDate,
      leaveDate,
      totalPrice,
    } = req.body;
    //console.log(req.body);
    if (
      !spaceId ||
      !name ||
      !email ||
      !phoneNo ||
      !vehicleNo ||
      !arrivalTime ||
      !leaveTime ||
      !arrivalDate ||
      !leaveDate ||
      !totalPrice
    ) {
      return res.status(400).json();
    }
    const createReservation = new reservation({
      userId,
      spaceId,
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      leaveTime,
      arrivalDate,
      leaveDate,
      totalPrice,
      isCustom: true,
    });

    const response = await createReservation.save();
    const io = req.app.get("io");
    var spaces = await space.findById(spaceId);
    spaces = spaces.userId;
    const objectId = new ObjectId(spaces);
    spaces = objectId.toString();

    // Emit an event to notify clients about the space status change

    await emitReservationMessage(
      io,
      userId,
      spaces,
      "reservationUpdated",
      "",
      "Your custom reservation has been created."
    );
    // //console.log(createReservation)
    return res.status(201).json({
      message: "Reservation created successfully",
    });
  } catch (error) {
    //console.log(error.message);
    return res.status(500).json();
  }
};
const getReservation = async (req, res) => {
  const userId = req.user.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "need to login" });
    }
    const spaceIds = await space.find({ userId }).select("_id");
    const response = await reservation
      .find({ spaceId: { $in: spaceIds } })
      .populate("spaceId", "title per_hour per_day")
      .populate("userId", "fName email");

    if (!response) {
      //console.log("error");
      return res.status(404).json();
    }
    return res.status(200).json({ response });
  } catch (error) {
    //console.log(error);
    //console.log(error.message);
    return res.status(500).json();
  }
};
const cancelReservation = async (req, res) => {
  try {
    const io = req.app.get("io");
    console.log(req.body);
    const { reservationId } = req.body;

    if (!reservationId) {
      return res.status(400).json({ message: "Reservation ID is required" });
    }

    const reservations = await reservation.findById(reservationId);
    if (!reservations) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const spaces = await space.findById(reservations.spaceId);
    if (!spaces) {
      return res.status(404).json({ message: "Space not found" });
    }

    reservations.state = "cancelled";
    await reservations.save();

    var reservationUserId = reservations.userId;
    var spaceOwnerId = spaces.userId;
    reservationUserId = new ObjectId(reservationUserId);
    reservationUserId = reservationUserId.toString();
    spaceOwnerId = new ObjectId(spaceOwnerId);
    spaceOwnerId = spaceOwnerId.toString();
    await emitReservationMessage(
      io,
      reservationUserId,
      spaceOwnerId,
      "reservationUpdated",
      "Your reservation has been cancelled.",
      "A reservation for your space has been cancelled."
    );

    return res.status(200).json({
      message: "Reservation cancelled successfully, notifications sent.",
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while cancelling the reservation" });
  }
};
const confirmReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    // Extract reservationId from req.body
    const { reservartionId } = req.body;
    //console.log("reservationId");
    //console.log(reservartionId);

    // Check if reservationId is provided
    if (!reservartionId) {
      return res.status(400).json({ message: "Reservation ID is required" });
    }

    // Find reservation by ID
    const getreservation = await reservation.findById(reservartionId); // Use the correct model name
    // Check if reservation exists
    if (!getreservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Update reservation state
    // if (getreservation.state === "pending")
    getreservation.state = "confirmed";

    // Save the updated reservation
    await getreservation.save();
    const io = req.app.get("io");

    var spaceOwnerId = await space.findById(getreservation.spaceId);
    spaceOwnerId = spaceOwnerId.userId.toString();

    var reservationuserId = new ObjectId(getreservation.userId);
    reservationuserId = reservationuserId.toString();

    // Emit an event to notify clients about the space status change
    await emitReservationMessage(
      io,
      reservationuserId,
      spaceOwnerId,
      "reservationUpdated",
      "Your reservation is confirmed. Please arrived on time",
      "Reservation is confirmed"
    );

    return res
      .status(200)
      .json({ message: "Reservation confirmed successfully" });
  } catch (error) {
    //console.log(error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while cancelling the reservation" });
  }
};
const getReservationData = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const response = await reservation
      .findOne({ _id: reservationId, spaceId: { $ne: null } })
      .populate("spaceId");
    // const response = await reservations
    // .find({ userId, spaceId: { $ne: null } })  // Only fetch documents where spaceId is not null
    // .populate("spaceId", "title per_hour per_day")
    // .populate("userId", "fName email");

    if (!response) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    return res.status(200).json({ response });
  } catch (error) {
    //console.log(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
const createReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    //console.log("userId: ", userId)
    if (!userId) {
      //console.log("User not found");
      return res.status(401).json();
    }
    const {
      spaceId,
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      leaveTime,
      arrivalDate,
      leaveDate,
      totalPrice,
    } = req.body;
    //console.log(req.body);
    if (
      !spaceId ||
      !name ||
      !email ||
      !phoneNo ||
      !vehicleNo ||
      !arrivalTime ||
      !leaveTime ||
      !arrivalDate ||
      !leaveDate ||
      !totalPrice
    ) {
      return res.status(400).json();
    }
    const isSpace = await space.findOne({ _id: spaceId }); // Match _id with spaceId from frontend

    if (isSpace) {
      if (isSpace.state !== "active") {
        return res.status(404).json();
      }
    }

    const createReservation = new reservation({
      userId,
      spaceId,
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      leaveTime,
      arrivalDate,
      leaveDate,
      totalPrice,
      isCustom: false,
    });
    const response = await createReservation.save();
    const io = req.app.get("io");
    // Emit an event to notify clients about the space status change
    var spaceOwnerId = new ObjectId(isSpace.userId);
    spaceOwnerId = spaceOwnerId.toString();
    await emitReservationMessage(
      io,
      userId,
      spaceOwnerId,
      "reservationUpdated",
      "Reservation is created. We will notify you after confirmation",
      "New reservation resquest is recieved"
    );

    return res.status(201).json({
      message: "Reservation created successfully",
      response,
    });
  } catch (error) {
    //console.log(error.message);
    return res.status(500).json();
  }
};
const getUserReservation = async (req, res) => {
  const userId = req.user.id;
  try {
    if (!userId) {
      return res.status(401).json({ message: "need to login" });
    }
    const response = await reservation
      .find({ userId, spaceId: { $ne: null }, isCustom: false })
      .populate("spaceId", "address images")
      .populate("reviewId", "rating");

    if (!response) {
      //console.log("error");
      return res.status(404).json();
    }
    return res.status(200).json({ response });
  } catch (error) {
    //console.log(error);
    //console.log(error.message);
    return res.status(500).json();
  }
};

const getAllReservation = async (req, res) => {
  // const userId = req.user.id;
  try {
    // if (!userId) {
    //   return res.status(401).json({ message: "need to login" });
    // } else {
    const response = await reservation.find();
    if (!response) {
      //console.log("error");
      return res.status(404).json();
    }
    return res.status(201).json({ response });
  } catch (error) {
    // }
    //console.log(error.message);
  }
};
const reservedReservation = async (req, res) => {
  const { reservationId } = req.body; // Expecting the new state in the request body
  try {
    const userId = req.user.id;
    // Find the reservation by ID
    const isReservation = await reservation.findById(reservationId);
    //console.log("reservationId");

    if (!isReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // Update the reservation state
    isReservation.state = "reserved";

    // Save the updated reservation
    await isReservation.save();
    const io = req.app.get("io");

    var spaceOwnerId = await space.findById(isReservation.spaceId);
    spaceOwnerId = new ObjectId(spaceOwnerId.userId);
    spaceOwnerId = spaceOwnerId.toString();
    await emitReservationMessage(
      io,
      userId,
      spaceOwnerId,
      "reservationUpdated",
      "Reservation is reserved. Your times start now.",
      "Reservation is reserved by user"
    );
    // Emit a socket event to notify clients of the update (if using Socket.io)

    return res.status(200).json({
      message: "Reservation status updated successfully",
      isReservation,
    });
  } catch (error) {
    console.error("Error updating reservation status:", error.message);
    return res
      .status(500)
      .json({ message: "Error updating reservation status", error });
  }
};

const getSpaceSpecificReservations = async (req, res) => {
  const { spaceId } = req.params;
  //console.log("response");
  //console.log(spaceId);
  try {
    const response = await reservation.find({ spaceId: spaceId });
    res.status(200).json(response);
  } catch (error) {
    //console.log(error.messgae);
  }
};
const postReview = async (req, res) => {
  try {
    console.log("review function called");

    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json();
    }
    const { rating, msg, reservationId, spaceId } = req.body;
    const isSpace = await space.findById(spaceId);
    if (isSpace) {
      const isReservation = await reservation.findById(reservationId);
      if (isReservation) {
        if (isReservation.reviewId === null) {
          const Review = new review({
            userId: userId,
            spaceId: spaceId,
            reservationId: reservationId,
            rating: rating,
            reviewMsg: msg,
          });
          const response = await Review.save();
          await reservation.findByIdAndUpdate(reservationId, {
            reviewId: Review._id,
          });

          //calculate average review
          const reviews = await review.find({ spaceId: spaceId });
          let total = 0;
          for (let i = 0; i < reviews.length; i++) {
            total += reviews[i].rating;
          }
          const avg = (total / reviews.length).toFixed(1);

          await space.findByIdAndUpdate(spaceId, {
            averageRating: avg,
          });
          const spaceResponse = await space.findById(spaceId);
          var ownerSpaceId = new ObjectId(spaceResponse.userId);
          ownerSpaceId = ownerSpaceId.toString();

          const io = req.app.get("io");
          await io.emit("reviewUpdate", {
            userId: ownerSpaceId,
            message: `A new ${rating}.0 star review is given`,
            rating: rating,
            reviewMsg: msg,
          });

          return res.status(200).json({
            message: "Review Submitted successfully",
            response,
          });
        } else {
          res.status(403).json({
            message: "Review already submitted",
          });
        }
      } else {
        res.status(404).json({ message: "Reservation found error" });
      }
    } else {
      res.status(404).json({ message: "Space found error or been deleted" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(501).json();
  }
};
const getReservationReview = async (req, res) => {
  try {
    const { reservationId } = req.params;
    //console.log("reservationId")
    //console.log(reservationId)
    const response = await review.findOne({ reservationId: reservationId });
    if (response) {
      //console.log("review found")
      //console.log(response)
      res.status(201).json(response);
    } else {
      //console.log("review not found")
      res.status(404).json();
    }
  } catch (error) {
    res.status(500).json();
    //console.log(error.message)
  }
};
const allReservation = async (req, res) => {
  try {
    const response = await reservation.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
const cancelReservationByAdmin = async (req, res) => {
  try {
    const { reservationId } = req.body;
    console.log(req.body);
    if (!reservationId) {
      return res.status(400).json({ message: "Reservation ID is required" });
    }

    const reservations = await reservation.findById(reservationId);
    if (!reservations) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }

    const spaces = await space.findById(reservations.spaceId);
    if (!spaces) {
      return res
        .status(404)
        .json({ success: false, message: "Space not found" });
    }

    reservations.state = "cancelled";
    await reservations.save();
    return res.status(200).json({
      success: true,
      message: "Reservation cancelled successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while cancelling the reservation",
    });
  }
};
const confirmReservationByAdmin = async (req, res) => {
  try {
    console.log(req.body);

    const { reservartionId } = req.body;

    if (!reservartionId) {
      return res
        .status(400)
        .json({ success: false, message: "Reservation ID is required" });
    }
    const getreservation = await reservation.findById(reservartionId); // Use the correct model name
    if (!getreservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }
    getreservation.state = "confirmed";

    const response = await getreservation.save();
    console.log(response);
    return res
      .status(200)
      .json({ success: true, message: "Reservation confirmed successfully" });
  } catch (error) {
    //console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while cancelling the reservation",
    });
  }
};
module.exports = {
  createReservation,
  createCustomReservation,
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
};
