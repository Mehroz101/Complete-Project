import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useDashboard } from "../context/DataContext";
import {
  totalCancelledRequests,
  totalCompletedRequests,
  totalPendingRequests,
} from "../utils/function";

export default function PieChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { reservationData } = useDashboard();
  useEffect(() => {
    const totalPending = totalPendingRequests(reservationData);
    const totalCompleted = totalCompletedRequests(reservationData);
    const totalCancelled = totalCancelledRequests(reservationData);
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["cancelled", "pending", "completed"],
      datasets: [
        {
          data: [totalCancelled, totalPending, totalCompleted],
          backgroundColor: [
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card flex justify-content-center">
      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
