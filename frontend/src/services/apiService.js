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
    return response.data || [];
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const confirmrequest = async (reservartionId) => {
  try {
    const data = { reservartionId };
    const token = localStorage.getItem("admintoken");
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
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const cencelrequest = async (reservationId) => {
  try {
    const data = { reservationId };
    const token = localStorage.getItem("admintoken");
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
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const updateStatus = async (spaceId) => {
  try {
    const data = { spaceId };
    const token = localStorage.getItem("admintoken");
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
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const acceptrequest = async (paymentId) => {
  try {
    const data = { paymentId };
    const token = localStorage.getItem("admintoken");
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
    return response.data;
  } catch (error) {
    notify("error", error.response.data.message);
  }
};
export const rejectrequest = async (paymentId) => {
  try {
    const data = { paymentId };
    const token = localStorage.getItem("admintoken");
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
export const fetchAllSpaceReviewsData = async (spaceId) => {
  // const response = await axios.get(`${API_URL}/spaces/${spaceId}/reviews`);
  // const data = await response.json();
  // return data;
};
