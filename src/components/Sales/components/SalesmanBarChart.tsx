// components/SalesmanBarChart.tsx
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

interface OrderStat {
  salesmanName: string;
  totalOrders: number;
  totalOrderValue: number;
}

interface SalesmanBarChartProps {
  orderStats: OrderStat[];
}

const SalesmanBarChart: React.FC<SalesmanBarChartProps> = ({ orderStats }) => {
  const labels = orderStats && orderStats.map((stat) => stat.salesmanName);
  const minTotalOrdersHeight = 5; // Set your minimum height here
  const totalOrdersData =
    orderStats &&
    orderStats.map((stat) =>
      Math.max(Number(stat.totalOrders), minTotalOrdersHeight)
    );
  const totalOrderValueData =
    orderStats && orderStats.map((stat) => Number(stat.totalOrderValue));

  const data = {
    labels,
    datasets: [
      {
        label: "Total Orders",
        data: totalOrdersData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Order Value",
        data: totalOrderValueData,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Adjust as needed
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Salesman Orders Overview",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SalesmanBarChart;
