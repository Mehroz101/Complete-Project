// src/services/useCreateSpaceForm.js
import { useState } from "react";
import { createSpace } from "../services/spaceService";
import { notify } from "./errorHandlerService";

export const useCreateSpaceForm = () => {
  const [spaceDetails, setSpaceDetails] = useState({
    title: "",
    short_description: "",
    description: "",
    address: "",
    country: "",
    city: "",
    features: [],
    longitude: "",
    latitude: "",
    per_hour: "",
    per_day: "",
    limit:0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const lettersWithSpacesRegex = /^[A-Za-z\s]*$/; // Only letters and spaces
    const numbersRegex = /^[0-9]*$/; // Only numbers
const numberletterRegex = /^[A-Za-z0-9\s]*$/
    if (type === "checkbox") {
      setSpaceDetails((prevState) => ({
        ...prevState,
        features: checked
          ? [...prevState.features, value]
          : prevState.features.filter((feature) => feature !== value),
      }));
    } else {
      // name === 'title' ||
      if ( name === "country" || name === "city" ) {
          // If the input is for email, allow special characters
          if (lettersWithSpacesRegex.test(value) || value === ' ') {
            setSpaceDetails((prevState) => ({
                  ...prevState,
                  [name]: value,
              }));
          }
        }
  
      else if(name === 'per_hour' || name === "per_day") {
          // If the input is for email, allow special characters
          if (numbersRegex.test(value) || value === '') {
            setSpaceDetails((prevState) => ({
                  ...prevState,
                  [name]: value,
              }));
          }
        }
        // else if(name === "short_description" || name === "description"){
          
        //   if (numberletterRegex.test(value) || value === '') {
        //     setSpaceDetails((prevState) => ({
        //           ...prevState,
        //           [name]: value,
        //       }));
        //   }
        // }
        else{
          setSpaceDetails((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
     
    }
  };

  const handleSubmit = async (files) => {
    try {
      //console.log(" recieved");
      //console.log(files);
      const formData = new FormData();

      formData.append("title", spaceDetails.title);
      formData.append("short_description", spaceDetails.short_description);
      formData.append("description", spaceDetails.description);
      formData.append("address", spaceDetails.address);
      formData.append("city", spaceDetails.city);
      formData.append("country", spaceDetails.country);
      formData.append("features", JSON.stringify(spaceDetails.features));
      formData.append("longitude", spaceDetails.longitude);
      formData.append("latitude", spaceDetails.latitude);
      formData.append("per_hour", spaceDetails.per_hour);
      formData.append("per_day", spaceDetails.per_day);
      formData.append("limit", spaceDetails.limit);

      files.forEach((file, index) => {
        formData.append("files", file.file);
      });

      // Debugging FormData

      const response = await createSpace(formData);
      //console.log(response);
      if (response === 201) {
        // notify("success", "Space created successfully!");
        return 201;
      } else {
        handleError(response);
      }
    } catch (error) {
      // handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
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
            `Not Found: ${error.response.data.message || "Resource not found."}`
          );
          break;
        case 409:
          notify(
            "error",
            `Conflict: ${
              error.response.data.message || "Space already exists."
            }`
          );
          break;
        case 422:
          notify(
            "error",
            `Unprocessable Entity: ${
              error.response.data.message || "Validation error."
            }`
          );
          break;
        default:
          notify(
            "error",
            `Error: ${
              error.response.data.message || "An unexpected error occurred."
            }`
          );
      }
    } else if (error.request) {
      notify("error", "No response received from server.");
    } else {
      notify("error", `Error: ${error.message}`);
    }
  };

  return { spaceDetails, setSpaceDetails, handleChange, handleSubmit };
};
