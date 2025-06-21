import React, { useCallback, useEffect, useMemo, useState } from "react";
import Earning_card from "../components/Earning_card";
import PaymentTable from "../components/PaymentTable";
import { useDashboard } from "../context/DataContext";

const Earning = () => {
  const { earningData, reservationData } = useDashboard();

  // Function to calculate revenue
  const calculateRevenue = useCallback((data) => {
    if (!data || data.length === 0) return 0;
    return data.reduce((total, item) => {
      if (["confirmed", "completed", "reserved"].includes(item.state)) {
        return total + (parseFloat(item.totalPrice) || 0);
      }
      return total;
    }, 0);
  }, []);

  // Calculations
  const revenue = useMemo(
    () => calculateRevenue(reservationData),
    [reservationData, calculateRevenue]
  );
  // Function to calculate profit (10% of revenue)
  const calculateProfit = useCallback((revenue) => {
    return revenue * 0.1; // 10% of the revenue
  }, []);

  const profit = useMemo(
    () => calculateProfit(revenue),
    [revenue, calculateProfit]
  );

  return (
    <>
      <div className="earning_page">
        <div className="earning_cards flex justify-content-between align-content-center gap-4 flex-wrap">
          <Earning_card
            title={"Revenue"}
            revenue={revenue?.toFixed(2)}
            icon={"pi pi-credit-card"}
          />
          <Earning_card
            title={"Profit"}
            revenue={profit?.toFixed(2)}
            icon={"pi pi-dollar"}
          />
          {/* <Earning_card
            title={"Withdrawal Eligible"}
            revenue={withdrawalStatus ? "Yes" : "No"}
            icon={"pi pi-money-bill"}
          /> */}
        </div>
        <div className="card mt-4">
          <PaymentTable earningData={earningData} />
        </div>
      </div>
    </>
  );
};

export default Earning;
