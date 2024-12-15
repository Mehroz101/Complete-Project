import { useState } from "react";
import { updateAccountInformation } from "../services/userService";
import { notify } from "./errorHandlerService";

export const useAccountInformationForm = () => {
  const [userDetail, setUserDetail] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Define regex for letters only, email, and numbers
    const lettersRegex = /^[A-Za-z]*$/; // Only letters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const numbersRegex = /^[0-9]*$/; // Only numbers

    if (name === 'email') {
        // If the input is for email, allow special characters
        if (emailRegex.test(value) || value === '') {
            setUserDetail((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    } else if (name === 'phone') {
        // If the input is for phone, allow numbers only
        if (numbersRegex.test(value) || value === '') {
            setUserDetail((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    } else {
        // For other inputs (like name), restrict to letters only
        if (lettersRegex.test(value) || value === '') {
            setUserDetail((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }
};

  const updateUserDetails = (details) => {
    setUserDetail((prevState) => ({
      ...prevState,
      ...details,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAccountInformation({
        email: userDetail.email,
        fname: userDetail.fname,
        lname: userDetail.lname,
        phone: userDetail.phone,
      });
      notify("success", "Account information updated successfully.");
      // Optionally navigate to a different route after success
      // navigate("/dashboard");
      return response;
    } catch (error) {
      handleCatchErrors(error);
    }
  };

  const handleResponseErrors = (response) => {
    switch (response.status) {
      case 400:
        notify("error", `Bad Request: ${response.data.message || "Please check your input."}`);
        break;
      case 401:
        notify("error", `Unauthorized: ${response.data.message || "Please log in again."}`);
        break;
      case 404:
        notify("error", `Not Found: ${response.data.message || "Resource not found."}`);
        break;
      case 409:
        notify("error", `Conflict: ${response.data.message || "Email already exists."}`);
        break;
      case 422:
        notify("error", `Unprocessable Entity: ${response.data.message || "Password does not match."}`);
        break;
      default:
        notify("error", `Error: ${response.data.message || "Something went wrong."}`);
        break;
    }
  };

  const handleCatchErrors = (error) => {
    if (error) {
      handleResponseErrors(error);
    } else if (error.request) {
      notify("error", "Network error: Please check your connection and try again.");
    } else {
      notify("error", `Error: ${error.message}`);
    }
  };

  return {
    userDetail,
    handleChange,
    handleSubmit,
    updateUserDetails,
  };
};
