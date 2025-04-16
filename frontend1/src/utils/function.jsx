export const calculateRevenue = (earningData) => {
  if (!Array.isArray(earningData)) {
    console.error("earningData is not an array:", earningData);
    return 0; // return 0 if not an array
  }

  const totalRevenue = earningData.reduce(
    (total, earning) => total + parseInt(earning.withdrawAmount, 10),
    0
  );

  return totalRevenue;
};

export const totalPendingRequests = (reservationData) => {
  if (!Array.isArray(reservationData)) {
    console.error("reservationData is not an array:", reservationData);
    // return 0; // return 0 if not an array
  }

  const totalPending = reservationData.reduce((total, reservation) => {
    if (reservation.state === "pending") {
      return total + 1;
    }
    return total;
  }, 0);

  return totalPending;
};

export const totalCompletedRequests = (reservationData) => {
  if (!Array.isArray(reservationData)) {
    console.error("reservationData is not an array:", reservationData);
    return 0; // return 0 if not an array
  }

  const totalCompleted = reservationData.reduce((total, reservation) => {
    if (reservation.state === "completed") {
      return total + 1;
    }
    return total;
  }, 0);

  return totalCompleted;
};

export const totalCancelledRequests = (reservationData) => {
  if (!Array.isArray(reservationData)) {
    console.error("reservationData is not an array:", reservationData);
    return 0; // return 0 if not an array
  }

  const totalCencelled = reservationData.reduce((total, reservation) => {
    if (reservation.state === "cancelled") {
      return total + 1;
    }
    return total;
  }, 0);

  return totalCencelled;
};
