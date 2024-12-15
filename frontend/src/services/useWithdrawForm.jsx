import { useState } from "react";
import { notify } from "./errorHandlerService";
import { withDrawRequest } from "./withDrawService";

export const useWithdrawForm = () => {
  const [withdrawDetail, setWithdrawDetail] = useState({
    accountType: "easypaisa", // Default value for the select field
    accountName: "",
    accountNumber:0,
    withdrawAmount: "",
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    const lettersWithSpacesRegex = /^[A-Za-z\s]*$/; // Only letters and spaces
    if (name === 'accountName' ) {
      // If the input is for email, allow special characters
      if (lettersWithSpacesRegex.test(value) || value === ' ') {
        setWithdrawDetail((prevState) => ({
              ...prevState,
              [name]: value,
          }));
      }
    }
else{

  setWithdrawDetail((prevState) => ({
    ...prevState,
    [name]: value,
  }));
}
  };

  const handleSubmit = async () => {
    try {
      const { accountType, accountName, accountNumber, withdrawAmount } =
        withdrawDetail;
      //console.log(withdrawDetail);
      if (
        accountType === "" ||
        accountName == "" ||
        accountNumber == "" ||
        withdrawAmount == null
      ) {
        notify("info", "please fill all the fileds");
        return;
      } else if (withdrawAmount < 25) {
        notify("info", "Minimum withdraw amount is 25");
        return;
      } else {
        const response = await withDrawRequest(withdrawDetail);
       //console.log("response in form: ",response)
        if (response.status === 200) {
          notify("success", "Withdraw request send successfully");
          return 200
        } else {
          switch (response.status) {
            case 400:
              notify(
                "error",
                `Bad Request: ${
                  response.data.message || "Please fill all the fileds."
                }`
              );
              break;
            case 401:
              notify(
                "error",
                `Unauthorized: ${
                  response.data.message || "Please log in again."
                }`
              );
              break;
            case 404:
              notify(
                "error",
                `Not Found: ${response.data.message || "Resource not found."}`
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
      }
    } catch (error) {
      if (error.response) {
        // Handle specific error responses from the backend
        switch (error.response.status) {
          case 400:
            notify(
              "error",
              `Bad Request: ${
                error.response.data.message || "Please fill all the fields"
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
    withdrawDetail,
    handleChange,
    setWithdrawDetail,
    handleSubmit,
  };
};
