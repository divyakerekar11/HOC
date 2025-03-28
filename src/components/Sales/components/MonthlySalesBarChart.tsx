// components/MonthlySalesBarChart.tsx
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

interface NewBusiness {
  userName: string;
  count: number;
  totalOrderValue: number;
}

interface MonthlySalesBarChartProps {
  monthlySalesData: NewBusiness[];
}

const MonthlySalesBarChart: React.FC<MonthlySalesBarChartProps> = ({
  monthlySalesData,
}) => {
  const labels =
    monthlySalesData && monthlySalesData.map((data) => data.userName);
  const countData =
    monthlySalesData && monthlySalesData.map((data) => data.count);
  const totalOrderValueData =
    monthlySalesData && monthlySalesData.map((data) => data.totalOrderValue);

  const data = {
    labels,
    datasets: [
      {
        label: "Count",
        data: countData,
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
        text: "Monthly Sales Overview",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MonthlySalesBarChart;
