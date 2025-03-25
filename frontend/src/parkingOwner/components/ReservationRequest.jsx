import React, { useEffect, useState } from "react";
import "../styles/ReservationRequest.css";
import { Link } from "react-router-dom";
import RequestRow from "./RequestRow";
import {
  getReservation,
  cancelReservation,
  confirmReservation,
} from "../../services/reservationService";
import { useParkingOwner } from "../../context/ReservationContext";

const ReservationRequest = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("title");
const {reservation} = useParkingOwner()
const handleSearchChange = (e) => {
  const { value } = e.target;
  setSearchTerm(value);

  // If search term is empty, reset to full data list
  if (!value.trim()) {
    setFilteredData(reservation);
    return;
  }

  const lowerCasedTerm = value.toLowerCase();
  
  const filtered = reservation.filter((reservation) => {
    let searchValue = "";

    if (searchOption === "title") {
      searchValue = reservation.spaceId?.title?.toLowerCase() || "";
    } else if (searchOption === "name") {
      searchValue = reservation.name?.toLowerCase() || "";
    }

    return searchValue.includes(lowerCasedTerm);
  });

  setFilteredData(filtered);
};


  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const updateListView = (state) => {
    //console.log(state)
    setActiveFilter(state);
    if (state === "all") {
      setFilteredData(reservation);
      return;
    }
    setFilteredData(reservation.filter((reservation) => reservation.state === state));
   
  };

  

  const handleCancelReservation = async (reservartionId) => {
    //console.log(reservartionId);
    await cancelReservation(reservartionId);
    // getreservationData();
  };
  const handleConfirmReservation = async (reservartionId) => {
    //console.log(reservartionId);
    await confirmReservation(reservartionId);
    // getreservationData();
  };

 
  useEffect(() => {
    if (reservation) {
      //console.log("reservation")
      //console.log(reservation)
      setFilteredData(reservation);
    }
  }, [reservation]);

  return (
    <>
      <div className="reservation_request_container">
        <h2>Reservation Request</h2>
        <div className="create_request">
          <Link to="create-request">
            <button>create request</button>
          </Link>
        </div>
        <div className="requests_numbers requests_numbers_hide">
          <div className="request_day">
            <h2>Requests</h2>
          </div>
          <div className="total_request">
            <p>Total request</p>
            <h2>{reservation?.length}</h2>
          </div>
          <div className="pending_request">
            <p>Pending request</p>
            <h2>
              {
                reservation?.filter((reservation) => reservation.state === "pending")
                  .length
              }
            </h2>
          </div>
          <div className="pending_request">
            <p>Confirmed request</p>
            <h2>
              {
                reservation?.filter((reservation) => reservation.state === "confirmed")
                  .length
              }
            </h2>
          </div>
          <div className="total_completed_request">
            <p>Total completed request</p>
            <h2>
              {
                reservation?.filter((reservation) => reservation.state === "completed")
                  .length
              }
            </h2>
          </div>
        </div>
        <div className="filter_navbar">
          <ul>
            <li className={activeFilter === "all" ? "active" : ""}>
              <Link onClick={() => updateListView("all")}>All</Link>
            </li>
            <li className={activeFilter === "pending" ? "active" : ""}>
              <Link onClick={() => updateListView("pending")}>Pending</Link>
            </li>
            <li className={activeFilter === "completed" ? "active" : ""}>
              <Link onClick={() => updateListView("completed")}>Completed</Link>
            </li>
            <li className={activeFilter === "confirmed" ? "active" : ""}>
              <Link onClick={() => updateListView("confirmed")}>Confirmed</Link>
            </li>
            <li className={activeFilter === "reserved" ? "active" : ""}>
              <Link onClick={() => updateListView("reserved")}>Reserved</Link>
            </li>
           
            <li className={activeFilter === "cancelled" ? "active" : ""}>
              <Link onClick={() => updateListView("cancelled")}>Cancelled</Link>
            </li>
          </ul>
        </div>
        <div className="search_filter">
          <div className="search_box">
            <select name="search_option" onChange={handleSearchOptionChange}>
              <option value="title">Title</option>
              <option value="name">Name</option>
            </select>
            <div className="search_input">
              <input
                type="text"
                placeholder="search..."
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="reservation_request_list">
          <table className="highlight responsive_table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Request Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Arrival</th>
                <th>Leave</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            
              {filteredData.length > 0 ? (
                filteredData
                  ?.slice()
                  .reverse()
                  .map((reservation, index) => (
                    <RequestRow
                      key={reservation._id}
                      reservation={reservation}
                      index={index+1}
                      handleCancelReservation={handleCancelReservation}
                      handleConfirmReservation={handleConfirmReservation}
                    />
                  ))
              ) : (
                <tr>
                  <td colSpan="10">No reservations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReservationRequest;
