import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function ChartLine({ requests, revenues }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Get last 7 days' labels
    const getLast7DaysLabels = () => {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString("en-US", { weekday: "short" })); // e.g., Mon, Tue
      }
      return days;
    };

    // Aggregate data for the last 7 days
    const aggregateData = (data, key) => {
      const last7Days = Array(7).fill(0); // Initialize array with zeros
      const today = new Date();

      data?.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const diffInDays = Math.floor(
          (today - createdAt) / (1000 * 60 * 60 * 24)
        );
        if (diffInDays >= 0 && diffInDays < 7) {
          const index = 6 - diffInDays; // Map to the last 7 days
          last7Days[index] += parseFloat(item[key] || 1); // Increment count or sum value
        }
      });

      return last7Days;
    };

    // Prepare data
    const prepareChartData = () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      const labels = getLast7DaysLabels();
      const requestsData = aggregateData(requests, null); // Count requests
      const revenueData = aggregateData(revenues, "withdrawAmount"); // Sum revenue

      const data = {
        labels,
        datasets: [
          {
            label: "Requests",
            data: requestsData,
            fill: false,
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            tension: 0.4,
          },
          {
            label: "Revenue",
            data: revenueData,
            fill: false,
            borderColor: documentStyle.getPropertyValue("--pink-500"),
            tension: 0.4,
          },
        ],
      };

      const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };

      setChartData(data);
      setChartOptions(options);
    };

    prepareChartData();
  }, [requests, revenues]);

  return (
    <div className="card">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
