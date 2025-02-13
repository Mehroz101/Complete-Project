import React, { useEffect, useState } from "react";
import Img from "../assets/hero_img.png";
import { Link } from "react-router-dom";
import ReviewPopup from "./ReviewPopup";
import io from "socket.io-client"; // Import socket.io-client
import {
  cancelReservation,
  getUserReservation,
} from "../services/reservationService";
import { postReview } from "../services/reservationService";

const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const socket = io(REACT_APP_API_URL); // Replace with your server URL

const ReservationHistory = () => {
  const [reviewBox, setReviewBox] = useState(false);
  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all"); // State to keep track of active filter
  const [review, setReview] = useState({
    rating: 0,
    msg: "",
    spaceId: "",
    reservationId: "",
  });
  const handleSubmit = async () => {
    //console.log(review);
    const response = await postReview(review);
    getreservationData()
    setReviewBox(false);

  };
  const hidePopupFun = () => {
    setReviewBox(false);
  };

  const getreservationData = async () => {
    try {
      const response = await getUserReservation();
      //console.log(response);
      setData(response);
    } catch (error) {
      //console.log(error);
    }
  };
  const handleCancelReservation = async (reservartionId) => {
    //console.log(reservartionId);
    await cancelReservation(reservartionId);
    getreservationData();
  };
  const setReviewFun = (resvId, spaceId) => {
    //console.log("reservation id: ", resvId);
    //console.log("space id: ", spaceId);
    setReviewBox(true);
    setReview((prev) => ({
      ...prev,
      reservationId: resvId,
      spaceId: spaceId,
    }));
  };
  useEffect(() => {
    getreservationData();
    // Set up socket listeners for real-time updates
    socket.on(
      "reservationUpdated",
      (data) => {
        //console.log("socket", data.message);
        getreservationData();
      },
      []
    );
    // Cleanup on unmount
    return () => {
      socket.off("reservationUpdated");
    };
  }, []);

  // Function to update active filter and view based on filter selection
  const updateListView = (filter) => {
    setActiveFilter(filter);
  };

  // Filter the data based on the activeFilter
  const filteredData =
    activeFilter === "all"
      ? data
      : data.filter((item) => item.state === activeFilter);

  return (
    <div className="reservation_history_container">
      <h2>Booking History</h2>

      <div className="filter_navbar">
        <ul>
          <li className={`${activeFilter === "all" ? "active" : ""}`}>
            <Link onClick={() => updateListView("all")}>All</Link>
          </li>
          <li className={`${activeFilter === "pending" ? "active" : ""}`}>
            <Link onClick={() => updateListView("pending")}>Pending</Link>
          </li>
          <li className={`${activeFilter === "confirmed" ? "active" : ""}`}>
            <Link onClick={() => updateListView("confirmed")}>Confirmed</Link>
          </li>
          <li className={`${activeFilter === "completed" ? "active" : ""}`}>
            <Link onClick={() => updateListView("completed")}>Completed</Link>
          </li>
          <li className={`${activeFilter === "reserved" ? "active" : ""}`}>
            <Link onClick={() => updateListView("reserved")}>Reserved</Link>
          </li>
          <li className={`${activeFilter === "cancelled" ? "active" : ""}`}>
            <Link onClick={() => updateListView("cancelled")}>Cancelled</Link>
          </li>
        </ul>
      </div>

      <div className="reservation_list">
        <table className="highlight responsive_table">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Image</th>
              <th>Location</th>
              <th>Reservation ID</th>
              <th>Arrival</th>
              <th>Leave</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData?.reverse().map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`${REACT_APP_API_URL}/${item?.spaceId?.images[0]}`}
                      alt="Reservation"
                    />
                  </td>
                  <td className="title">{item?.spaceId?.address}</td>
                  <td className="id">{item?.reservationID}</td>
                  <td className="date">
                    {item?.arrivalDate} {item?.arrivalTime}
                  </td>
                  <td className="date">
                    {item?.leaveDate} {item?.leaveTime}
                  </td>
                  <td>Rs. {item.totalPrice}</td>
                  <td>
                    <span className={`status ${item?.state}`}>
                      {item?.state}
                    </span>
                  </td>
                  <td>
                    {/* {item.state === "confirmed" ||
                      (item.state === "reserved" && <button>Direction</button>)} */}
                    {item.state === "pending" && (
                      <>
                        {/* <button>Direction</button> */}
                        <button
                          onClick={() => handleCancelReservation(item?._id)}
                        >
                          cancel
                        </button>
                      </>
                    )}
                    {item.state === "completed" &&
                      (!item.reviewId ? (
                        <button
                          onClick={() =>
                            setReviewFun(item?._id, item?.spaceId?._id)
                          }
                        >
                          Review
                        </button>
                      ) : (
                        <>
                          <span className="rating_score">
                            {item?.reviewId?.rating}
                          </span>
                          <i className="fa-solid fa-star"></i>
                        </>
                      ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No reservations found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {reviewBox && (
        <ReviewPopup
          hidePopUp={hidePopupFun}
          handleSubmit={handleSubmit}
          review={review}
          setReview={setReview}
        />
      )}
    </div>
  );
};

export default ReservationHistory;
