import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toggleSpaceStatus } from "../../services/spaceService";

const SpaceRow = ({
  spaceInfo,
  spaceIndex,
  handleToggleStatus,
  handleDeleteSpace,
  reservations,
}) => {
  const [pause, setPause] = useState(false);

  // Calculate total bookings for the current space
  const totalBookings = reservations.filter(
    (reservation) => reservation.spaceId._id === spaceInfo._id
  ).length;
  // Calculate total pending for the current space
  const totalPending = reservations
    .filter((reservation) => reservation.spaceId._id === spaceInfo._id)
    .filter((reservation) => reservation.state === "pending").length;
  const totalConfirmed = reservations
    ?.filter((reservation) => reservation.spaceId._id === spaceInfo._id)
    .filter((reservation) => reservation.state === "confirmed").length;
  //   const totalPending = 0;
  //   const totalBookings = 0;
  // const totalConfirmed = 0;
  //console.log("reservations");
  //console.log("spaceInfo");
  //console.log(spaceInfo);
  // Toggle space status
  const toggleStatus = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    try {
      const spaceId = spaceInfo._id;
      const newState = await toggleSpaceStatus(spaceId);
      if (newState === "Space status updated") {
        setPause(!pause);
      }
      handleToggleStatus(spaceInfo._id, newState); // Notify parent component about the state change
    } catch (error) {
      console.error("Failed to toggle space status:", error);
    }
  };

  // Delete space
  const deleteSpace = (e) => {
    e.preventDefault(); // Prevent default link behavior
    handleDeleteSpace(spaceInfo._id);
  };

  const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;

  return (
    <>
      <tr>
        <td>
          <span className="id">{spaceIndex + 1}</span>
        </td>
        <td>
          <img
            src={`${REACT_APP_API_URL}/${spaceInfo.images[0]}`}
            alt="Product Image"
            className="responsive_img"
            width="50"
          />
        </td>
        <td className="title">{spaceInfo.title}</td>
        <td className="request_id_td">
          <span className="request_id">{spaceInfo?.spaceID ? spaceInfo?.spaceID: 0 }</span>
        </td>
        <td className="total_booking">{totalBookings}</td>
        <td className="total_pending_booking">{totalPending}</td>
        <td className="total_confirmed_booking">{totalConfirmed}</td>
        <td className="price">Rs. {spaceInfo.per_hour}</td>
        <td>
          <span className={`status ${spaceInfo.state}`}>{spaceInfo.state}</span>
        </td>
        <td className="actions">
          <Link title="View Space" to={`view-space/${spaceInfo._id}`}>
            <i className="fa-regular fa-eye"></i>
            <p></p>
          </Link>
          <Link title="Edit" to={`/dashboard/edit-space/${spaceInfo._id}`}>
            <i className="fa-solid fa-pen"></i>
          </Link>
          <Link title="Pause/Activate" onClick={toggleStatus}>
            {spaceInfo.state === "active" ? (
              <i className="fa-solid fa-pause"></i>
            ) : (
              <i className="fa-solid fa-play"></i>
            )}
          </Link>
          {/* <Link title="Delete" onClick={deleteSpace}>
            <i className="fa-solid fa-trash"></i>
          </Link> */}
        </td>
      </tr>
    </>
  );
};

export default SpaceRow;
