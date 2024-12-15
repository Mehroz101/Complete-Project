import { useState } from "react";
import { notify } from "./errorHandlerService";
import { createReservation } from "./reservationService";
import {
  calculateHours,
  calculatePrice,
} from "../parkingOwner/components/Functions";

export const useReservationForm = () => {
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    phoneNo: "",
    vehicleNo: "",
    arrivalDate: "",
    arrivalTime: "",
    leaveDate: "",
    leaveTime: "",
    spaceId: "",
    per_hour: "",
    per_day: "",
  });
  const handleChange = (e) => {
    const {name,value} = e.target; 
    const lettersWithSpacesRegex = /^[A-Za-z\s]*$/; // Only letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    const numbersRegex = /^[0-9]*$/; // Only numbers

    if (name === 'name') {
        // If the input is for email, allow special characters
        if (lettersWithSpacesRegex.test(value) || value === ' ') {
          setReservation((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
      }
    else if(name === 'email') {
        // If the input is for email, allow special characters
        if (emailRegex.test(value) || value === '') {
          setReservation((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
      }
    else if(name === 'phoneNo') {
        // If the input is for email, allow special characters
        if (numbersRegex.test(value) || value === '') {
          setReservation((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
      }
      else{

        setReservation({ ...reservation, [name]: value });
      }
  };
  const handleSubmit = async () => {
    const {
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      arrivalDate,
      leaveTime,
      leaveDate,
      per_hour,
      per_day,
    } = reservation;

    
    if (
      name === "" ||
      email === "" ||
      phoneNo === "" ||
      vehicleNo === "" ||
      arrivalTime === "" ||
      arrivalDate === "" ||
      leaveTime === "" ||
      leaveDate === ""
    ) {
      notify("warning", "All fields are required");
    } else {
      try {
        const hour = calculateHours(
          arrivalTime,
          arrivalDate,
          leaveTime,
          leaveDate
        );
       
        const price = calculatePrice(hour, per_hour, per_day);
        console.log("price: ",price)
        const updatedRequest = {
          ...reservation,
          totalPrice: price, // Add the calculated price here
        };
        console.log("reservation is creating");
        const response = await createReservation(updatedRequest);
        console.log("response")
        console.log(response)
        if (response.status === 201) {
          notify("success", "Reservation created successfully");
          return 201;
        } else {
          notify("error", "something wents wrong");
        }
      } catch (error) {
        console.log(error)
        console.log(error.message);
      }
    }
  };

  return {
    handleChange,
    handleSubmit,
    reservation,
    setReservation,
  };
};
