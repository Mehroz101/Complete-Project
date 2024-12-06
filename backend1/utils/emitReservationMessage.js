// utils/emitReservationMessage.js

async function emitReservationMessage(
  io,
  userId,
  spaceOwnerId,
  messageCode,
  messageToReservationUser = "",
  messageToSpaceOwner = ""
) {
  //   console.log("spaceOwnerId: ", typeof spaceOwnerId);
  //   console.log("userId: ", typeof userId);
  //   console.log("messageCode: ", messageCode);
  //   console.log("messageToReservationUser: ", messageToReservationUser);
  //   console.log("messageToSpaceOwner: ", messageToSpaceOwner);
  if (spaceOwnerId == userId) {
    io.emit(messageCode, {
      message: messageToSpaceOwner,
      userId: userId,
    });
    return;
  }
  if (messageToReservationUser !== "")
    io.emit(messageCode, {
      message: messageToReservationUser,
      userId: userId,
    });
  if (messageToSpaceOwner !== "")
    io.emit(messageCode, {
      message: messageToSpaceOwner,
      userId: spaceOwnerId,
    });
}

module.exports = emitReservationMessage;
