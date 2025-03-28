// components/RenewalsBarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Renewal {
  userName: string;
  count: number;
  totalOrderValue: number;
}

interface RenewalsBarChartProps {
  totalRenewals: Renewal[];
}

const RenewalsBarChart: React.FC<RenewalsBarChartProps> = ({
  totalRenewals,
}) => {
  const labels = totalRenewals.map((data) => data.userName);
  const countData = totalRenewals.map((data) => data.count);
  const totalOrderValueData = totalRenewals.map((data) => data.totalOrderValue);

  const data = {
    labels,
    datasets: [
      {
        label: "Count",
        data: countData,
        // backgroundColor: "rgba(75, 192, 192, 0.6)",
        backgroundColor: "rgba(0, 175, 0, 0.66)",
      },
      {
        label: "Total Order Value",
        data: totalOrderValueData,
        // backgroundColor: "rgba(153, 102, 255, 0.6)",
        backgroundColor: "rgba(160, 92, 174, 0.98)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Renewals Overview",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RenewalsBarChart;
