import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ParkingFinderCard from "../components/ParkingFinderCard";
import "../styles/MainApp.css";
import ListingContainer from "../components/ListingContainer";
import ListingDetail from "../components/ListingDetail";
import MapBox from "../components/MapBox";
import { getallspaces } from "../services/spaceService"; // Assuming getallspaces is an API call to fetch spaces
import { notify } from "../services/errorHandlerService";
import { useParams } from "react-router-dom";
import { getallreservation } from "../services/reservationService"; // Assuming getallreservation is an API call to fetch reservations
import SkeletonCard from "../components/Skeletonbox";
import { calculateDistance } from "../parkingOwner/components/Functions"; // Assuming calculateDistance is a utility function
import { useMainAppContext } from "../context/MainAppContext"; // Assuming you're using context for state management

const MainApp = () => {
  const [togglebtn, setToggelbtn] = useState(false);
  const [parkingInput, setParkingInput] = useState(false);
  const [showListingDetail, setShowListingDetail] = useState(false); // State to control ListingDetail visibility
  const [showSpace, setShowSpace] = useState(""); // To store selected space details
  const [isLoading, setIsLoading] = useState(true); // Loading state
 
  const {
    getAllReservations,
    getAllSpaces,
    setGetAllReservations,
    setGetAllSpaces,
    reviews
  } = useMainAppContext();

  // Extracting route parameters (for search input, dates, etc.)
  const {
    searchInput,
    arrivalDate,
    arrivalTime,
    leaveDate,
    leaveTime,
    totalHours,
  } = useParams();

  // Function to handle showing detail of a specific space
  const handleShowDetail = (spaceId) => {
    const selectedSpace = getAllSpaces.find((space) => space._id === spaceId); // Changed from `filter` to `find` for single space
    setShowSpace(selectedSpace);
  };

  // Function to close the detail popup
  const handleCloseDetail = () => {
    setShowListingDetail(false);
  };

  // Fetch spaces and reservations (including filtering by search location)
  const getspaces = async (searchLocation = null) => {
    try {
      const response = await getallspaces()
      const Resrepsonse = await getallreservation()
      setGetAllSpaces(response)
      setGetAllReservations(Resrepsonse)
      if (searchInput) {

        const nearbySpaces = response?.filter((space) => {
          const distance = calculateDistance(
            searchLocation?.latitude,
            searchLocation?.longitude,
            space?.latitude,
            space?.longitude
          );
          return distance <= 5; // Filter spaces within 5km radius
        });
        setGetAllSpaces(nearbySpaces || []);
       // Update context with filtered spaces
      } else {
        setGetAllSpaces(await getallspaces()); // Fetch and set all spaces from the API
      }

      setGetAllReservations(await getallreservation()); // Fetch and set all reservations from the API
      setIsLoading(false); // Data loaded, hide skeleton
    } catch (error) {
      console.error(error.message);
      notify("error", "Something went wrong, please try again later");
    }
  };

  // Trigger space fetching on component mount or when searchInput changes
  useEffect(() => {
    getspaces();
  }, [searchInput]); // Added dependency to refetch spaces when searchInput changes

  // Show listing detail when space is selected
  useEffect(() => {
    if (showSpace) {
      setShowListingDetail(true);
    }
  }, [showSpace]);

  return (
    <div className="main_page">
      <Navbar />
      <div className="app_container">
        <div className="app_left">
          <div
            className={
              parkingInput
                ? "ParkingFinderCard"
                : "ParkingFinderCard ParkingFinderCard_hide"
            }
          >
            <ParkingFinderCard />
            <div
              className="droparrow"
              onClick={() => setParkingInput(!parkingInput)}
            >
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div
            className={
              parkingInput
                ? "parkingFinderDetail parkingFinderDetail_hide"
                : "parkingFinderDetail "
            }
            onClick={() => setParkingInput(!parkingInput)}
          >
            <p className="location">{searchInput}</p>
            <div className="datetime">
              <span className="arrival">
                {arrivalDate} {arrivalTime}
              </span>
              <span className="leave">
                {leaveDate} {leaveTime}
              </span>
            </div>
          </div>
          <div className="app_listings">
            <div className="listing_filter_sort">
              {/* <select name="sort" id="sort">
                <option>sort by</option>
                <option value="price">Price</option>
                <option value="distance">Distance</option>
              </select>
              <select name="filter" id="filter">
                <option>filter</option>
                <option value="CCTV">CCTV</option>
                <option value="guard">Guard</option>
              </select> */}
              <button
                className="toggle_btn"
                onClick={() => setToggelbtn(!togglebtn)}
              >
                {togglebtn ? "list" : "map"}
              </button>
            </div>
            <div
              className={`${
                togglebtn
                  ? "Listing_container Listing_container_hide"
                  : "Listing_container"
              } ${parkingInput ? "listing_container_full" : ""}`}
            >
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : Array.isArray(getAllSpaces) && getAllSpaces.length === 0 ? (
                <div className="no_data_found">
                  <i className="fa-solid fa-face-meh"></i>
                  <span>No space found within 5km</span>
                </div>
              ) : (
                Array.isArray(getAllSpaces) &&
                getAllSpaces.map((slot) => (
                  <ListingContainer
                    key={slot._id}
                    slotData={slot}
                    reservations={getAllReservations}
                    reviews={reviews}
                    onShowDetail={handleShowDetail}
                  />
                ))
              )}
            </div>
          </div>
          {showListingDetail && (
            <div className="popup_detail">
              <ListingDetail
                space={showSpace}
                reservations={getAllReservations}
                reviews={reviews}
                onHideDetail={handleCloseDetail}
              />
            </div>
          )}
        </div>
        <div
          className={togglebtn ? "app_right" : "app_right app_right_hide"}
          onClick={() => setParkingInput(false)}
        >
          {isLoading ? (
            <SkeletonCard />
          ) : Array.isArray(getAllSpaces) && getAllSpaces.length === 0 ? (
            ""
          ) : (
            <ListingContainer
              key={showSpace._id}
              slotData={showSpace}
              reservations={getAllReservations}
              reviews={reviews}
              onShowDetail={handleShowDetail}
            />
          )}
          <MapBox
            spaces={getAllSpaces}
            getSpace={getspaces}
            onShowDetail={handleShowDetail}
          />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
