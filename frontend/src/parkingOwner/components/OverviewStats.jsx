import React, { useEffect } from "react";
import "../styles/OverviewStats.css";
import "./Chart";
import Chart from "./Chart";
import { useParkingOwner } from "../../context/ReservationContext";

const OverviewStats = () => {
  const { reservation, space } = useParkingOwner();

  const totalEarning = Array.isArray(reservation)
    ? reservation.reduce((acc, request) => {
        if (
          request.spaceId !== null &&
          (request.state === "completed" ||
            request.state === "confirmed" ||
            request.state === "reserved")
        ) {
          const price = parseFloat(request.totalPrice); // Convert to number
          return acc + (isNaN(price) ? 0 : price); // Handle invalid numbers
        }
        return acc;
      }, 0)
    : 0;
  const totalBooking = Array.isArray(reservation)
    ? reservation.reduce((acc, req) => {
        if (
          req.state == "completed" ||
          req.state === "reserved" ||
          req.state === "confirmed"
        ) {
          if (req.spaceId === null && req.state === "confirmed") {
            return acc;
          }
          return acc + 1;
        }
        return acc;
      }, 0)
    : 0;
  const withdrawable = Array.isArray(reservation)
    ? reservation.reduce((acc, request) => {
        if (request.state === "completed" && request.withdrawn === false) {
          const price = parseFloat(request.totalPrice);
          return acc + (isNaN(price) ? 0 : price);
        }
        return acc;
      }, 0)
    : 0;

  return (
    <div className="overview_stats">
      <div className="stats_container">
        <div className="stat_item">
          <div className="stat_header">
            <span>Total Earnings</span>
          </div>
          <div className="stat_value">
            <h2>Rs. {totalEarning.toFixed(2)}</h2>
          </div>
        </div>
        <div className="stat_item">
          <div className="stat_header">
            <span>Available Slots</span>
          </div>
          <div className="stat_value">
            <h2>{space.length}</h2>
          </div>
        </div>
        <div className="stat_item">
          <div className="stat_header">
            <span>Total Bookings</span>
          </div>
          <div className="stat_value">
            <h2>{totalBooking}</h2>
          </div>
        </div>
        <div className="stat_item">
          <div className="stat_header">
            <span>Withdrawable</span>
          </div>
          <div className="stat_value">
            <h2>Rs. {withdrawable.toFixed(2)}</h2>
          </div>
        </div>
      </div>
      <div className="graph_container">
        <h3>Weekly Earnings</h3>
        {/* Here, you can include a graph/chart library like Chart.js */}
        <div className="earnings_graph">
          {/* Placeholder for the graph */}
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;
