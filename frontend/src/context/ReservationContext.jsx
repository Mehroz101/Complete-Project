import { createContext, useEffect, useState, useContext } from "react";
import { getReservation } from "../services/reservationService";
import { getSpace, getSpaceReviews } from "../services/spaceService";
import io from "socket.io-client";
import { getWithdrawRequest } from "../services/withDrawService";
import { useAuth } from "./AuthContext";

const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const socket = io(REACT_APP_API_URL);

const ParkingOwnerContext = createContext();

export const ParkingOwnerProvider = ({ children }) => {
  const [reservation, setReservation] = useState([]);
  const [space, setSpace] = useState([]);
  const [earningReq, setEarningReq] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [reviewnotifications, setReviewNotifications] = useState([]);
  const [spaceReviews, setSpaceReviews] = useState([]);
  const [overAllRating, setOverAllRating] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { docdedId } = useAuth();
  const getReservationData = async () => {
    try {
      const response = await getReservation();
      setReservation(response);
    } catch (error) {
      //console.log(error.message);
    }
  };

  const getSpaceData = async () => {
    try {
      setIsLoading(true);

      const response = await getSpace();
      setSpace(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error.message);
    }
  };

  const getEarningData = async () => {
    try {
      const response = await getWithdrawRequest();
      setEarningReq(response);
    } catch (error) {
      //console.log(error.message);
    }
  };

  const getSpaceReviewsData = async (spaceId) => {
    try {
      const response = await getSpaceReviews(spaceId);
      setSpaceReviews(response);
    } catch (error) {
      //console.log(error.message);
    }
  };

  const loadNotificationsFromStorage = () => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        return Array.isArray(parsedNotifications) ? parsedNotifications : [];
      } catch (error) {
        console.error("Error parsing notifications from localStorage:", error);
        return [];
      }
    }
    return [];
  };
  const loadReviewNotificationsFromStorage = () => {
    const storedNotifications = localStorage.getItem("reviewNotifications");
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        return Array.isArray(parsedNotifications) ? parsedNotifications : [];
      } catch (error) {
        console.error("Error parsing notifications from localStorage:", error);
        return [];
      }
    }
    return [];
  };

  const maintainLatestNotifications = (notificationArray) => {
    const latestNotifications = notificationArray.slice(0, 10);
    localStorage.setItem("notifications", JSON.stringify(latestNotifications));
    return latestNotifications;
  };
  const maintainLatestReviewNotifications = (notificationArray) => {
    const latestNotifications = notificationArray.slice(0, 10);
    localStorage.setItem(
      "reviewNotifications",
      JSON.stringify(latestNotifications)
    );
    return latestNotifications;
  };

  const addNotification = (message) => {
    setNotifications((prevNotifications) => {
      const newNotification = {
        message,
        timestamp: new Date(),
        id: Date.now(),
      };
      const updatedNotifications = [newNotification, ...prevNotifications];
      return maintainLatestNotifications(updatedNotifications);
    });
  };
  const addReviewNotification = (reviewMsg, rating) => {
    setReviewNotifications((prev) => {
      const newReviewNotification = {
        reviewMsg,
        rating,
        id: Date.now(),
      };
      const updatedReviewNotifications = [newReviewNotification, ...prev];
      return maintainLatestReviewNotifications(updatedReviewNotifications);
    });
  };
  const calculateOverallRating = () => {
    if (space.length === 0) return 0;

    const avgRating = space.reduce(
      (acc, space) => acc + (space.averageRating || 0),
      0
    );
    return (avgRating / space.length).toFixed(1);
  };

  useEffect(() => {
    if (!isLoading) {
      const newOverallRating = calculateOverallRating();
      setOverAllRating(newOverallRating);
    }
  }, [space, isLoading]);

  useEffect(() => {
    getReservationData();
    getSpaceData();
    getEarningData();

    // Load notifications from local storage
    const loadedNotifications = loadNotificationsFromStorage();
    const loadedReviewNotifications = loadReviewNotificationsFromStorage();
    setNotifications(loadedNotifications);
    setReviewNotifications(loadedReviewNotifications);

    socket.on("reservationUpdated", (data) => {
      if (docdedId === data.userId) {
        addNotification(data.message);
        getReservationData();
        getSpaceData();
      }
    });

    socket.on("spaceUpdated", (data) => {
      if (docdedId === data.userId) {
        addNotification(data.message);
      }
      getReservationData();
      getSpaceData();
    });

    socket.on("paymentUpdated", (data) => {
      if (docdedId === data.userId) {
        addNotification(data.message);
      }
      getEarningData();
      getReservationData();
    });

    socket.on("reviewUpdate", (data) => {
      if (docdedId === data.userId) {
        addNotification(data.message);
      }
      console.log(data);
      addReviewNotification(data.reviewMsg, data.rating);
      overAllRating();
    });

    return () => {
      socket.off("reservationUpdated");
      socket.off("spaceUpdated");
      socket.off("paymentUpdated");
      socket.off("reviewUpdate");
    };
  }, []);

  return (
    <ParkingOwnerContext.Provider
      value={{
        reservation,
        space,
        earningReq,
        setSpace,
        setReservation,
        setEarningReq,
        getEarningData,
        notifications,
        reviewnotifications,
        getSpaceReviewsData,
        spaceReviews,
        getReservationData,
        overAllRating,
      }}
    >
      {children}
    </ParkingOwnerContext.Provider>
  );
};

export const useParkingOwner = () => {
  return useContext(ParkingOwnerContext);
};
