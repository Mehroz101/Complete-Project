import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllEarningData,
  fetchAllReservationData,
  fetchAllSpaceData,
  fetchAllReviewsData,
  fetchAllUserData,
} from "../services/apiService";
import { useAuth } from "./AuthContext";

// Define the API URL

// Dashboard Context to hold all the dashboard state
const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  // Define your fetch functions
  const { checkuserstatus } = useAuth();

  // Using `useQuery` hook to fetch data
  const {
    data: reservationData,
    isLoading: reservationLoading,
    refetch: getReservationData,
  } = useQuery({
    queryKey: ["reservationData"],
    queryFn: fetchAllReservationData,
    enabled: checkuserstatus,
  });

  const {
    data: spaceData,
    isLoading: spaceLoading,
    refetch: getSpaceData,
  } = useQuery({
    queryKey: ["spaceData"],
    queryFn: fetchAllSpaceData,
    enabled: checkuserstatus, // Conditional fetching
  });

  const {
    data: earningData,
    isLoading: earningLoading,
    refetch: getEarningData,
  } = useQuery({
    queryKey: ["earningData"],
    queryFn: fetchAllEarningData,
    enabled: checkuserstatus,
  });

  const {
    data: userData,
    isLoading: userLoading,
    refetch: getUserData,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchAllUserData,
    enabled: checkuserstatus,
  });

  const {
    data: allReviewsData,
    isLoading: reviewsLoading,
    refetch: getAllReviewsData,
  } = useQuery({
    queryKey: ["allReviewsData"],
    queryFn: fetchAllReviewsData,
    enabled: checkuserstatus,
  });
  if (checkuserstatus) {
    if (!reservationData || !spaceData || !earningData || !userData)
      return <div>Loading...</div>;
  }
  // Return the context provider with the necessary values
  return (
    <DashboardContext.Provider
      value={{
        reservationData,
        spaceData,
        earningData,
        userData,
        allReviewsData,
        reservationLoading,
        spaceLoading,
        earningLoading,
        userLoading,
        reviewsLoading,
        getReservationData,
        getSpaceData,
        getEarningData,
        getUserData,
        getAllReviewsData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to access the dashboard context
export const useDashboard = () => {
  return useContext(DashboardContext);
};

// const loadNotificationsFromStorage = () => {
//   const storedNotifications = localStorage.getItem("notifications");
//   if (storedNotifications) {
//     try {
//       const parsedNotifications = JSON.parse(storedNotifications);
//       return Array.isArray(parsedNotifications) ? parsedNotifications : [];
//     } catch (error) {
//       console.error("Error parsing notifications from localStorage:", error);
//       return [];
//     }
//   }
//   return [];
// };
// const loadReviewNotificationsFromStorage = () => {
//   const storedNotifications = localStorage.getItem("reviewNotifications");
//   if (storedNotifications) {
//     try {
//       const parsedNotifications = JSON.parse(storedNotifications);
//       return Array.isArray(parsedNotifications) ? parsedNotifications : [];
//     } catch (error) {
//       console.error("Error parsing notifications from localStorage:", error);
//       return [];
//     }
//   }
//   return [];
// };

// const maintainLatestNotifications = (notificationArray) => {
//   const latestNotifications = notificationArray.slice(0, 10);
//   localStorage.setItem("notifications", JSON.stringify(latestNotifications));
//   return latestNotifications;
// };
// const maintainLatestReviewNotifications = (notificationArray) => {
//   const latestNotifications = notificationArray.slice(0, 10);
//   localStorage.setItem(
//     "reviewNotifications",
//     JSON.stringify(latestNotifications)
//   );
//   return latestNotifications;
// };

// const addNotification = (message) => {
//   setNotifications((prevNotifications) => {
//     const newNotification = {
//       message,
//       timestamp: new Date(),
//       id: Date.now(),
//     };
//     const updatedNotifications = [newNotification, ...prevNotifications];
//     return maintainLatestNotifications(updatedNotifications);
//   });
// };
// const addReviewNotification = (reviewMsg, rating) => {
//   setReviewNotifications((prev) => {
//     const newReviewNotification = {
//       reviewMsg,
//       rating,
//       id: Date.now(),
//     };
//     const updatedReviewNotifications = [newReviewNotification, ...prev];
//     return maintainLatestReviewNotifications(updatedReviewNotifications);
//   });
// };
// const calculateOverallRating = () => {
//   if (space.length === 0) return 0;

//   const avgRating = space.reduce(
//     (acc, space) => acc + (space.averageRating || 0),
//     0
//   );
//   return (avgRating / space.length).toFixed(1);
// };

// useEffect(() => {
//   if (!isLoading) {
//     const newOverallRating = calculateOverallRating();
//     setOverAllRating(newOverallRating);
//   }
// }, [space, isLoading]);

// useEffect(() => {
//   getReservationData();
//   getSpaceData();
//   getEarningData();

//   // Load notifications from local storage
//   const loadedNotifications = loadNotificationsFromStorage();
//   const loadedReviewNotifications = loadReviewNotificationsFromStorage();
//   setNotifications(loadedNotifications);
//   setReviewNotifications(loadedReviewNotifications);

//   socket.on("reservationUpdated", (data) => {
//     if (docdedId === data.userId) {
//       addNotification(data.message);
//     }
//     getReservationData();
//     getSpaceData();
//   });

//   socket.on("spaceUpdated", (data) => {
//     console.log("updated");
//     console.log(data.userId);
//     console.log(docdedId);
//     if (docdedId === data.userId) {
//       addNotification(data.message);
//     }
//     getReservationData();
//     getSpaceData();
//   });

//   socket.on("paymentUpdated", (data) => {
//     if (docdedId === data.userId) {
//       addNotification(data.message);
//     }
//     getEarningData();
//     getReservationData();
//   });

//   socket.on("reviewUpdate", (data) => {
//     if (docdedId === data.userId) {
//       addNotification(data.message);
//     }
//     console.log(data);
//     addReviewNotification(data.reviewMsg, data.rating);
//     overAllRating();
//   });

//   return () => {
//     socket.off("reservationUpdated");
//     socket.off("spaceUpdated");
//     socket.off("paymentUpdated");
//     socket.off("reviewUpdate");
//   };
// }, []);
