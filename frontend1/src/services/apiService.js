import axios from "axios";
import { notify } from "../utils/notification";
const API_URL = "http://localhost:5000";
export const loginAdmin = async (data) => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    console.log(data);
    const response = await axios.post(
      `${API_URL}/api/admin/login`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const signupAdmin = async (data) => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    console.log(data);
    const response = await axios.post(
      `${API_URL}/api/admin/signup`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/api/user/allusers`, config);
    return response.data || [];
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const addUser = async (data) => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    console.log(data);
    const response = await axios.post(
      `${API_URL}/api/user/addusers`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const editUser = async (data) => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/api/user/edituser`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};

export const fetchAllReservationData = async () => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/api/reservation/allreservations`,
      config
    );
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    notify("error", error.response.data.message);
  }
};

export const fetchAllSpaceData = async () => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/api/spaces/getallspacesbyadmin`,
      config
    );
    console.log(response.data.data);
    return response.data.data || [];
  } catch (error) {
    notify("error", error.response.data.message);
  }
};

export const fetchAllEarningData = async () => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/api/withdraw/allearnings`,
      config
    );
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    notify("error", error.response.data.message);
  }
};

export const fetchAllUserData = async () => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/api/user/allusers`, config);
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const confirmrequest = async (reservartionId) => {
  try {
    const data = { reservartionId };
    console.log("axios");
    console.log(data);
    const token = localStorage.getItem("admintoken");
    console.log(token); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/api/reservation/confirmbyadmin`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const cencelrequest = async (reservationId) => {
  try {
    const data = { reservationId };
    console.log(data);
    const token = localStorage.getItem("admintoken");
    console.log(token); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/api/reservation/cancelbyadmin`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const updateStatus = async (spaceId) => {
  try {
    const data = { spaceId };
    console.log(data);
    const token = localStorage.getItem("admintoken");
    console.log(token); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.patch(
      `${API_URL}/api/spaces/updatebyadmin`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const acceptrequest = async (paymentId) => {
  try {
    const data = { paymentId };
    console.log(data);
    const token = localStorage.getItem("admintoken");
    console.log(token); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/api/withdraw/acceppaytbyadmin`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const rejectrequest = async (paymentId) => {
  try {
    const data = { paymentId };
    console.log(data);
    const token = localStorage.getItem("admintoken");
    console.log(token); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/api/withdraw/rejectpaytbyadmin`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const changePassword = async (data) => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    console.log(data);
    const response = await axios.post(
      `${API_URL}/api/admin/changepassword`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const fetchAllReviewsData = async () => {
  try {
    const token = localStorage.getItem("admintoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/api/reviews/allreviews`,
      config
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const rejectReview = async (reviewId) => {
  try {
    const data = { reviewId };
    console.log(data);
    const token = localStorage.getItem("admintoken");
    console.log(token); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/api/reviews/rejectbyadmin`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const approveReview = async (reviewId) => {
  try {
    const data = { reviewId };
    console.log(data);
    const token = localStorage.getItem("admintoken");
    console.log(token); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/api/reviews/approvebyadmin`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const isFavoriteReview = async (reviewId) => {
  try {
    const data = { reviewId };
    console.log(data);
    const token = localStorage.getItem("admintoken");
    console.log(token); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/api/reviews/isfavoritebyadmin`,
      data,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
