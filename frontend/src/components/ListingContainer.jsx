import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  calculatePrice,
  totalBooking,
} from "../parkingOwner/components/Functions";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const ListingContainer = ({
  onShowDetail,
  slotData,
  reservations,
  reviews,
}) => {
  const [space, setSpace] = useState([]);
  const [price, setPrice] = useState("");
  const [totalCompleted, setTotalCompleted] = useState(0); // State to hold total confirmed bookings
  const [totalReviews, setTotalReviews] = useState(0);
  const { totalHours } = useParams();

  useEffect(() => {
    if (slotData) {
      setSpace(slotData);
      // //console.log(slotData)
      if (space) {
        const total = calculatePrice(totalHours, space.per_hour, space.per_day);
        setPrice(total);
      }
      setTotalCompleted(totalBooking("completed", slotData, reservations));
      //console.log("slotData._id");
      //console.log(slotData._id);
      //console.log("review spaceId");
      // reviews?.map((review) => console.log(review.spaceId));
      const matchingReviewsCount =
        reviews?.filter((review) => review?.spaceId === slotData._id)?.length ||
        0;
        setTotalReviews(matchingReviewsCount)
    }
  }, [space, totalHours]);
  return (
    <>
      <div className="listing">
        <div className="listing_left">
          <img src={`${REACT_APP_API_URL}/${space.images?.[0]}`} alt="" />
        </div>
        <div className="listing_right">
          <div className="listing_title">
            <h3>{space.title}</h3>
          </div>
          <div className="location">
            <i className="fa-solid fa-location-dot"></i>
            <span>{space.address}</span>
          </div>
          <div className="listing_rating">
            <span className="rating">
              <span className="rating_score">{space.averageRating}</span>
              <i className="fa-solid fa-star"></i>
              <span className="total_reviews">({totalReviews})</span>
            </span>
            <span className="total_booking">{totalCompleted} booking</span>
          </div>

          <div className="listing_detail">
            <div className="listing_features">
              {space.features?.map((feature, index) => {
                switch (feature) {
                  case "secure":
                    return (
                      <span key={index} title="secure">
                        <i className="fa-solid fa-shield-halved"></i>
                      </span>
                    );
                  case "underground":
                    return (
                      <span key={index} title="underground">
                        <i className="fa-solid fa-arrow-down-short-wide"></i>
                      </span>
                    );
                  case "cctv":
                    return (
                      <span key={index} title="cctv">
                        <i className="fa-solid fa-video"></i>
                      </span>
                    );
                  default:
                    return null;
                }
              })}
            </div>
            <span>
              <Link onClick={() => onShowDetail(space._id)}>details</Link>
            </span>
          </div>
          <div className="listing_btn">
            <Link to={`/reservation/${space._id}`}>
              <button>Book in Rs. {price}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingContainer;
