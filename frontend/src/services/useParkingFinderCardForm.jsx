import { useState } from "react";
import { notify } from "./errorHandlerService";
import {
  calculateHours,
} from "../parkingOwner/components/Functions";

export const useParkingFinderCardForm = () => {
  const [findParking, setFindParking] = useState({
    searchInput: "",
    arrivalDate: "",
    arrivalTime: "",
    leaveDate: "",
    leaveTime: "",
    totalHours: "",
  });
  const handleChange = (e) => {
    const lettersRegex = /^[A-Za-z]*$/; // Only letters
    if(e.target.name == "searchInput"){
      if (lettersRegex.test(e.target.value) || e.target.value === '') {
        setFindParking((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    }
    else{

      setFindParking({ ...findParking, [e.target.name]: e.target.value });
    }
   
  };

  const handleSubmit = () => {
    const { searchInput, arrivalDate, arrivalTime, leaveDate, leaveTime } =
      findParking;
  

    if (
      searchInput === "" ||
      arrivalDate === "" ||
      arrivalTime === "" ||
      leaveDate === "" ||
      leaveTime === ""
    ) {
      notify("info", "please enter in all field to search");
      return 400;
    } else if (
      searchInput === undefined ||
      arrivalDate === undefined ||
      arrivalTime === undefined ||
      leaveDate === undefined ||
      leaveTime === undefined
    ) {
      notify("info", "please enter in all field to search");
      return 400;
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
      return 400;
    }

    // Condition 2: Arrival must be in the future for dates after today
    if (arrivalDateTime <= now) {
      notify("warning", "Arrival Date is in past");
      return 400;
    }

    // Condition 3: Leave time must be after arrival time
    if (leaveDateTime <= arrivalDateTime) {
      notify("warning", "Leave Date or time is less than arrival date");
      return 400;
    }
    //console.log(leaveDateTime - arrivalDateTime);
    const minParkingDuration = 60 * 60 * 1000; // Minimum duration: 30 minutes
    if (leaveDateTime - arrivalDateTime < minParkingDuration) {
      notify("warning", "Parking time must be at least 1 hour.");
      return 400;
    }
    const hours = calculateHours(
      arrivalTime,
      arrivalDate,
      leaveTime,
      leaveDate
    );
    findParking.totalHours = hours.toFixed(2);
    //console.log(hours);
    localStorage.setItem("arrivalDate",arrivalDate)
    localStorage.setItem("arrivalTime",arrivalTime)
    localStorage.setItem("leaveDate",leaveDate)
    localStorage.setItem("leaveTime",leaveTime)
    localStorage.setItem("totalHours", findParking.totalHours)

  };
  return {
    handleChange,
    handleSubmit,
    setFindParking,
    findParking,
  };
};
