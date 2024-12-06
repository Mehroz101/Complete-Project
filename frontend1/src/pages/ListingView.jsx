import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpace, getSpaceReviews } from "../../services/spaceService";
import "../styles/ViewSpace.css";
import { reviewDateCalculator } from "./Functions";
import { useParkingOwner } from "../../context/ReservationContext";

const ListingView = () => {
  const [space, setSpace] = useState(null);
  const [review, setReview] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const { spaceId } = useParams();
  const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
  const [reservationCount, setReservationCount] = useState(0);
  const { reservation, space: spaceData } = useParkingOwner();
  const getSpaceData = async () => {
    const spaceInfo = spaceData?.filter((space) => space?._id === spaceId);
    //console.log("Filtered Space Info:", spaceInfo); // Log the filtered space info
    if (spaceInfo.length > 0) {
      setSpace(spaceInfo[0]);
      setImages(spaceInfo[0]?.images || []);
      setCurrentImageIndex(0);
    } else {
      console.error("No space found for the given spaceId:", spaceId);
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
  const getReview = async () => {
    try {
      const response1 = await getSpaceReviews(spaceId);
      //console.log(response1);
      setReview(response1);
    } catch (error) {
      //console.log(error.message);
    }
  };
  useEffect(() => {
    getSpaceData();
    getReview();
    const count = reservation
      ?.filter((reservation) => reservation.spaceId?._id === space?._id)
      .filter((reservation) => reservation.state === "completed").length;
    setReservationCount(count);
  }, [spaceId, spaceData, reservation]); // Add spaceData and reservation as dependencies

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

          {/* Google Map Location */}
          <div className="location-section">
            <h3>Location</h3>
            <iframe
              width="100%"
              height="250"
              src={`https://www.google.com/maps?q=${space?.latitude},${space?.longitude}&z=15&output=embed`}
            ></iframe>
          </div>

          {/* Reviews Section */}
          <div className="reviews-section">
            <h3>Reviews</h3>
            <div className="review-list">
              {review?.map((review, index) => {
                return (
                  <>
                    <div className="review-item" key={index}>
                      <h4>{review?.userId?.fName}</h4>
                      <div className="review-meta">
                        <span>{review?.rating}</span>
                        <i className="fa-solid fa-star"></i>
                        <span>{reviewDateCalculator(review.createdAt)}</span>
                      </div>
                      <p>"{review?.reviewMsg}"</p>
                    </div>
                  </>
                );
              })}
              {/* Add more review items here */}
            </div>
          </div>
        </div>

        {/* Features and Pricing */}
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
    </div>
  );
};

export default ListingView;
