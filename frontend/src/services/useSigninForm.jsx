import { useState } from "react";
import { signinUser } from "../services/authService"; // Import the signin service
import { notify } from "./errorHandlerService"; // Import notify function
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export const useSigninForm = () => {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signinUser({
        email: userDetail.email,
        password: userDetail.password,
      });

      if (response.status === 200) {
        navigate("/profile"); // Optionally, navigate to a different route

        notify("success", "Login successful!");
        login();
      } else {
        // Handle different response status codes
        switch (response.status) {
          case 400:
            notify(
              "error",
              `Bad Request: ${
                response.data.message || "Please check your input."
              }`
            );
            break;
          case 401:
            notify(
              "error",
              `Unauthorized: ${response.data.message || "Please log in again."}`
            );
            break;
          case 404:
            notify(
              "error",
              `Not Found ${response.data.message || "" }`
            );
            break;
          case 409:
            notify(
              "error",
              `Conflict: ${response.data.message || "Email already exists."}`
            );
            break;
          case 422:
            notify(
              "error",
              `Unprocessable Entity: ${
                response.data.message || "Password does not match."
              }`
            );
            break;
          default:
            notify(
              "error",
              `Error: ${response.data.message || "Something went wrong."}`
            );
            break;
        }
      }
    } catch (error) {
      // Handle errors from the API call
      if (error.response) {
        // Handle specific error responses from the backend
        switch (error.response.status) {
          case 400:
            notify(
              "error",
              `Bad Request: ${
                error.response.data.message || "Please check your input."
              }`
            );
            break;
          case 401:
            notify(
              "error",
              `Unauthorized: ${
                error.response.data.message || "Please log in again."
              }`
            );
            break;
          case 404:
            notify(
              "error",
              `Not Found: ${
                error.response.data.message || "Resource not found."
              }`
            );
            break;
          case 409:
            notify(
              "error",
              `Conflict: ${
                error.response.data.message || "Email already exists."
              }`
            );
            break;
          case 422:
            notify(
              "error",
              `Unprocessable Entity: ${
                error.response.data.message || "Password does not match."
              }`
            );
            break;
          default:
            notify(
              "error",
              `Error: ${error.response.data.message || "Something went wrong."}`
            );
            break;
        }
      } else if (error.request) {
        // Handle network errors
        notify(
          "error",
          "Network error: Please check your connection and try again."
        );
      } else {
        // Handle other errors
        notify("error", `Error: ${error.message}`);
      }
    }
  };

  return {
    userDetail,
    handleChange,
    handleSubmit,
  };
};
