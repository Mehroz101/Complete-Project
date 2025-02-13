import React, { useEffect, useState } from "react";
import "../styles/Earning.css";
import WithdrawRow from "./WithdrawRow";
import { useParkingOwner } from "../../context/ReservationContext";
import { useWithdrawForm } from "../../services/useWithdrawForm";
const Earning = () => {
  const [popup, setPopup] = useState(false);
  const [earning, setEarning] = useState({
    withdrawableBalane: "",
    lastMonth: "",
    totalEarning: "",
  });

  const { reservation, earningReq } = useParkingOwner();

  const { handleChange, handleSubmit, withdrawDetail, setWithdrawDetail } =
    useWithdrawForm();
  const handlePopupSubmit =async (e) => {
    e.preventDefault();
    const response =await handleSubmit();
    if (response === 200) setPopup(false);
  };
  useEffect(() => {
    let totalEarning = Array.isArray(reservation)
      ? reservation.reduce((acc, request) => {
          if (request.state === "completed" && request.withdrawn === true && earningReq === "completed" ) {
            const price = parseFloat(request.totalPrice); // Convert to number
            return acc + (isNaN(price) ? 0 : price); // Handle invalid numbers
          }
          return acc;
        }, 0)
      : 0;

    totalEarning = totalEarning.toFixed(2);

    let withdrawable = Array.isArray(reservation)
      ? reservation.reduce((acc, request) => {
          if (request.state === "completed" && request.withdrawn === false) {
            const price = parseFloat(request.totalPrice);
            return acc + (isNaN(price) ? 0 : price);
          }
          return acc;
        }, 0)
      : 0;
    withdrawable = withdrawable.toFixed(2);
    let lastMonthEarning = Array.isArray(reservation)
      ? reservation.reduce((acc, request) => {
          const requestDate = new Date(request.createdAt);
          const today = new Date();
          let lastMonth = today.getMonth() - 1;
          let lastMonthYear = today.getFullYear();

          if (lastMonth < 0) {
            lastMonth = 11;
            lastMonthYear = lastMonthYear - 1;
          }
          // //console.log(requestDate.getMonth() >= lastMonth);
          if (
            (requestDate.getMonth() >= lastMonth &&
              requestDate.getFullYear() >= lastMonthYear) ||
            (lastMonth === 11 &&
              requestDate.getMonth() === 0 &&
              requestDate.getFullYear() === lastMonthYear)
          ) {
            if (request.state === "completed" && request.withdrawn === true ) {
              const price = parseFloat(request.totalPrice); // Convert to number
              return acc + (isNaN(price) ? 0 : price);
            }
          }

          return acc;
        }, 0)
      : 0;
    lastMonthEarning = lastMonthEarning.toFixed(2);
    setEarning({
      withdrawableBalane: withdrawable,
      lastMonth: lastMonthEarning,
      totalEarning: totalEarning,
    });
  }, [reservation]);
  useEffect(() => {
    setWithdrawDetail((prevState) => ({
      ...prevState,
      withdrawAmount: earning.withdrawableBalane, // Pass the earning's withdrawable balance to the form state
    }));
  }, [earning, setWithdrawDetail]);

  return (
    <>
      <div className="earning_container">
        <h2>Earning</h2>
        <div className="earning_container_top">
          <div className="current_balance">
            <div className="amount">
              <span>withdrawable balance</span>
              <h2>Rs. {earning.withdrawableBalane}</h2>
            </div>
            <button onClick={() => setPopup(true)}>withdraw</button>
          </div>
          <div className="balance_history">
            <div className="last_month">
              <div className="amount">
                <span>last month</span>
                <h2>Rs. {earning.lastMonth}</h2>
              </div>
            </div>
            <div className="life_time">
              <div className="amount">
                <span>total withdraw recieved</span>
                <h2>Rs. {earning.totalEarning}</h2>
              </div>
            </div>
          </div>
        </div>
        <h2>History</h2>
        <div className="earning_list">
          <table className="highlight responsive_table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Account name</th>
                <th>Account number</th>
                <th>Account type</th>
                <th>Status</th>
                <th>Order Id</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {earningReq
                ?.slice()
                .reverse()
                .map((request, index) => {
                  return <WithdrawRow requests={request} index={index + 1} />;
                })}
            </tbody>
          </table>
        </div>
        <div className={popup ? "withdraw_popup_container" : " popup_hide "}>
          <div className="withdraw_popup">
            <span className="cross_icon">
              <i
                className="fa-solid fa-xmark"
                onClick={() => setPopup(false)}
              ></i>
            </span>
            <h2>Withdraw Balance</h2>
            <p>Write your withdraw details</p>
            <div className="withdraw_detail_box">
              <div className="input_box">
                <span>Transfer to</span>
                <select
                  name="accountType"
                  id="method"
                  onChange={handleChange}
                  value={withdrawDetail.accountType}
                >
                  <option value="easypaisa">easypaisa</option>
                  <option value="jazzcash">jazzcash</option>
                  <option value="bank">bank account</option>
                </select>
              </div>

              <div className="input_box">
                <span>Account Holder Name</span>
                <input
                  type="text"
                  placeholder="Account holder name"
                  name="accountName"
                  onChange={handleChange}
                  value={withdrawDetail.accountName}
                />
              </div>

              <div className="input_box">
                <span>Account Number</span>
                <input
                  type="number"
                  placeholder="Enter account number"
                  name="accountNumber"
                  onChange={handleChange}
                  value={withdrawDetail.accountNumber}
                />
              </div>

              <div className="input_box amount">
                <span>Amount Withdraw</span>
                <span>Rs. {earning.withdrawableBalane}</span>
              </div>
            </div>
            <input
              type="hidden"
              name="withdrawAmount"
              value={withdrawDetail.withdrawAmount}
              readOnly
            />

            <div className="btn_box">
              <button
                type="button"
                className="cancel"
                onClick={() => setPopup(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="withdraw"
                onClick={handlePopupSubmit}
              >
                Confirm & Withdraw
              </button>
            </div>
            <p className="note">
              Please note withdraw minimum amount  25 per withdraw and cannot
              be undone after withraw. 10% dedection on every withdraw and it may take 7 business days to process
              payment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Earning;
