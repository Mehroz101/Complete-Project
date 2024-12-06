const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
  RESERVATION: "/reservation",
  NOTIFICATION: "/notification",
  EARNING: "/earning",
  LISTING: {
    LISTING_DATA: "/listings",
    LISTING_VIEW: "/listings",
  },
  REVIEWS: "/reviews",

  USERS: {
    USERS_DATA: "/users",
  },
  PARKING_DETAILS: (id) => `/parking/${id}`, // dynamic route with parameter
  NOT_FOUND: "*", // catch-all for 404 pages
};

export default ROUTES;
