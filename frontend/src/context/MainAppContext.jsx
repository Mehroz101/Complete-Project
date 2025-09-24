import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllReviews, getallspaces } from "../services/spaceService";
import io from "socket.io-client"; // Import socket.io-client
import { getallreservation } from "../services/reservationService";
const MainAppContextAPI = createContext();
// Socket connection (Make sure to replace with your actual backend URL)
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const socket = io(REACT_APP_API_URL,{
    transports: ["websocket"], 
}); // Replace with your server URL

export const MainAppProvider = ({ children }) => {
  const [getAllSpaces, setGetAllSpaces] = useState([]);
  const [getAllReservations, setGetAllReservations] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getData = async () => {
    const spaceResponse = await getallspaces();
    const reservationResponse = await getallreservation();
    const reviewResponse = await getAllReviews();

    setGetAllSpaces(spaceResponse);
    setGetAllReservations(reservationResponse);
    setReviews(reviewResponse);
  };
  useEffect(() => {
    getData();

    // Set up socket listeners for real-time updates
    socket.on(
      "spaceUpdated",
      (data) => {
        const { spaceId, status } = data;
        //console.log("socket", spaceId);
        //console.log("socket", status);
        getData();
      },
      []
    );
    // Cleanup on unmount
    return () => {
      socket.off("spaceUpdated");
    };
  }, []);
  return (
    <>
      <MainAppContextAPI.Provider
        value={{
          getAllReservations,
          getAllSpaces,
          setGetAllReservations,
          setGetAllSpaces,
          reviews,
          setReviews,
        }}
      >
        {children}
      </MainAppContextAPI.Provider>
    </>
  );
};

// export default MainAppContext;

export const useMainAppContext = () => {
  return useContext(MainAppContextAPI);
};
