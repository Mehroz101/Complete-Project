import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RequestRow = ({
  reservation,
  index,
  handleCancelReservation,
  handleConfirmReservation,
}) => {
  const [reservationReq, setReservationReq] = useState(reservation);
  const [nonReservationReq, setNonReservationReq] = useState();
  useEffect(() => {
    if (reservation?.spaceId !== null) {
      //console.log(reservation?.spaceId?.title);
      setReservationReq(reservation);
    } else {
      //console.log(reservation);
      setNonReservationReq(reservation);
    }
  }, [reservation]); // Run this effect when the reservation prop changes

  const cancelReservation = () => {
    handleCancelReservation(reservation._id);
  };
  const confirmReservation = () => {
    handleConfirmReservation(reservation._id);
  };
  return (
    <>
      <tr className="request_row">
        <td>
          <span className="id">{index}</span>
        </td>
        <td className="title">{reservationReq?.spaceId?.title}</td>
        <td className="request_id">{reservationReq?.reservationID}</td>
        <td className="user_name">{reservationReq.name}</td>
        <td className="user_email">{reservationReq.email}</td>
        <td className="arrival">
          {`${new Date(reservationReq.arrivalDate).toLocaleDateString()} 
          ${reservationReq.arrivalTime}`}
        </td>
        <td className="leave">
          {`${new Date(reservationReq.leaveDate).toLocaleDateString()} 
          ${reservationReq.leaveTime}`}
        </td>
        <td className="price">${reservationReq.totalPrice}</td>
        <td>
          {nonReservationReq && (
            <span className={`status cancelled`}>space deleted</span>
          )}
          {!nonReservationReq && (
            <span className={`status ${reservationReq.state}`}>
              {reservationReq.state}
            </span>
          )}
        </td>
        <td className="actions">
          <Link
            title="view request"
            to={`/dashboard/reservation-request/view-request/${reservationReq._id}`}
          >
            <i className="fa-regular fa-eye"></i>
          </Link>
          {reservationReq.state === "completed" ||
          reservationReq.state === "cancelled" ||
          reservationReq.state === "confirmed" ||
          reservationReq.state === "refund" ||
          reservationReq.state === "reserved" ? (
            ""
          ) : (
            <>
              <Link title="confirm" onClick={confirmReservation}>
                <i className="fa-solid fa-check"></i>
              </Link>
              <Link title="cancel" onClick={cancelReservation}>
                <i className="fa-solid fa-xmark"></i>
              </Link>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default RequestRow;
