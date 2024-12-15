import { useState } from "react";
import { createCustomReservation } from "./reservationService";
import { notify } from "./errorHandlerService";
import {
  calculateHours,
  calculatePrice,
} from "../parkingOwner/components/Functions";

export const customReservationRequest = () => {
  const [customRequest, setCustomRequest] = useState({
    spaceId: "",
    name: "",
    email: "",
    phoneNo: "",
    vehicleNo: "",
    arrivalTime: "",
    leaveTime: "",
    arrivalDate: "",
    leaveDate: "",
    price_perhour:"",
    price_perday:"",
  });
  const handleChange = (e) => {
    const {name,value} = e.target; 
    console.log("name")
    const lettersWithSpacesRegex = /^[A-Za-z\s]*$/; // Only letters and spaces
    const vehicleNoRegex = /^[A-Za-z0-9]*$/;    // Basic vehicleNo validation

    const numbersRegex = /^[0-9]*$/; // Only numbers

    if (name === 'name') {
        // If the input is for email, allow special characters
        if (lettersWithSpacesRegex.test(value) || value === '') {
          setCustomRequest((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
      }
   
    else if(name === 'phoneNo') {
        // If the input is for email, allow special characters
        if (numbersRegex.test(value) || value === '') {
          setCustomRequest((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
      }
    else if(name === 'vehicleNo') {
        // If the input is for email, allow special characters
        if (vehicleNoRegex.test(value) || value === '') {
          setCustomRequest((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
      }
      else{
        setCustomRequest({ ...customRequest, [name]: value });

      }
  };
  const handleSubmit = async () => {
    const {
      spaceId,
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      leaveTime,
      arrivalDate,
      leaveDate,
      price_perhour,
      price_perday,
    } = customRequest;
    //console.log(customRequest);

    if (
      spaceId === "" ||
      name === "" ||
      email === "" ||
      phoneNo === "" ||
      vehicleNo === "" ||
      arrivalTime === "" ||
      leaveTime === "" ||
      arrivalDate === "" ||
      leaveDate === "" ||
      price_perhour === "" ||
      price_perday === ""
    ) {
      notify("info", "Please fill all the fields");
      return;
    }
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // Parse the arrival and leave dates/times into Date objects
    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`);
    const leaveDateTime = new Date(`${leaveDate}T${leaveTime}`);
    if (arrivalDate === currentDate && arrivalDateTime <= now) {
      notify(
        "warning",
        "Arrival time must be greater than or equal to the current time"
      );
      return;
    }

    // Condition 2: Arrival must be in the future for dates after today
    if (arrivalDateTime <= now) {
      notify("warning", "Arrival Date is in past");
      return;
    }

    // Condition 3: Leave time must be after arrival time
    if (leaveDateTime <= arrivalDateTime) {
      notify("warning", "Leave Date or time is less than arrival date");
      return;
    }
    //console.log(leaveDateTime - arrivalDateTime);
    const minParkingDuration = 60 * 60 * 1000; // Minimum duration: 30 minutes
    if (leaveDateTime - arrivalDateTime < minParkingDuration) {
      notify("warning", "Parking time must be at least 1 hour.");
      return;
    }


    const hours = calculateHours(
      arrivalTime,
      arrivalDate,
      leaveTime,
      leaveDate
    );
    const price = calculatePrice(hours, price_perhour, price_perday);
    //console.log(price);
   

    const updatedRequest = {
      ...customRequest,
      totalPrice: price, // Add the calculated price here
    };
    const response = await createCustomReservation(updatedRequest);
    //console.log(response);
    return response;
  };

  return {
    customRequest,
    handleChange,
    handleSubmit,
  };
};
