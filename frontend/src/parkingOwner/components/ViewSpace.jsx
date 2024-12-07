import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpace, getSpaceReviews } from "../../services/spaceService";
import "../styles/ViewSpace.css";
import { reviewDateCalculator } from "./Functions";
import { useParkingOwner } from "../../context/ReservationContext";
import RequestRow from "./RequestRow";
import {
  cancelReservation,
  confirmReservation,
} from "../../services/reservationService";

const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;

const ViewSpace = () => {
  const [space, setSpace] = useState(null);
  const [review, setReview] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const { spaceId } = useParams();
  const [reservationCount, setReservationCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const { reservation, space: spaceData } = useParkingOwner();

  const fetchSpaceData = async () => {
    try {
      const spaceInfo = spaceData?.find((space) => space._id === spaceId);
      if (spaceInfo) {
        setSpace(spaceInfo);
        setImages(spaceInfo?.images || []);
      } else {
        const fetchedSpace = await getSpace(spaceId);
        setSpace(fetchedSpace);
        setImages(fetchedSpace?.images || []);
      }
    } catch (error) {
      console.error("Error fetching space data:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await getSpaceReviews(spaceId);
      setReview(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const filterReservations = () => {
    const filtered = reservation?.filter((res) => res.spaceId?._id === spaceId);
    setFilteredData(filtered);

    const completedCount = filtered?.filter(
      (res) => res.state === "completed"
    ).length;
    setReservationCount(completedCount);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await cancelReservation(reservationId);
      filterReservations();
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  const handleConfirmReservation = async (reservationId) => {
    try {
      await confirmReservation(reservationId);
      filterReservations();
    } catch (error) {
      console.error("Error confirming reservation:", error);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    fetchSpaceData();
    fetchReviews();
    filterReservations();
  }, [spaceId, reservation, spaceData]);

  return (
    <div className="view-space-container">
      {/* Image Carousel */}
      <div className="image-carousel">
        <button className="carousel-btn prev-btn" onClick={handlePreviousImage}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <img
          src={`${REACT_APP_API_URL}/${images[currentImageIndex]}`}
          alt={space?.title}
          className="carousel-image"
        />
        <button className="carousel-btn next-btn" onClick={handleNextImage}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Listing Details */}
      <div className="listing-details">
        <div className="details-left">
          <h2 className="space-title">{space?.title}</h2>
          <p className="space-address">
            <i className="fa-solid fa-location-dot"></i> {space?.address}
          </p>
          <div className="rating-section">
            <div className="rating">
              <span className="rating-score">{space?.averageRating}</span>
              <i className="fa-solid fa-star"></i>
              <span className="total-reviews">({review.length} reviews)</span>
            </div>
            <div className="total-booking">{reservationCount} bookings</div>
          </div>
          <div className="description-section">
            <h3>Short Description</h3>
            <p>{space?.short_description}</p>
            <h3>Full Description</h3>
            <p>{space?.description}</p>
          </div>

          <div className="location-section">
            <h3>Location</h3>
            <iframe
              width="100%"
              height="250"
              src={`https://www.google.com/maps?q=${space?.latitude},${space?.longitude}&z=15&output=embed`}
            ></iframe>
          </div>

          {review.length > 0 && (
            <div className="reviews-section">
              <h3>Reviews</h3>
              <div className="review-list">
                {review.map((review, index) => (
                  <div className="review-item" key={index}>
                    <h4>{review?.userId?.fName}</h4>
                    <div className="review-meta">
                      <span>{review?.rating}</span>
                      <i className="fa-solid fa-star"></i>
                      <span>{reviewDateCalculator(review.createdAt)}</span>
                    </div>
                    <p>"{review?.reviewMsg}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="details-right">
          <div className="features-section">
            <h4>Features</h4>
            <div className="feature-list">
              {space?.features?.map((feature, index) => (
                <span key={index} className="feature-item">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="pricing-section">
            <h4>Pricing</h4>
            <div className="pricing-item">
              <span>Per Day:</span>
              <span>${space?.per_day}</span>
            </div>
            <div className="pricing-item">
              <span>Per Hour:</span>
              <span>${space?.per_hour}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="reservation_requests">
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
              filteredData.map((reservation, index) => (
                <RequestRow
                  key={reservation._id}
                  reservation={reservation}
                  index={index + 1}
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
  );
};

export default ViewSpace;
