import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderData {
  totalOrders: number;
  totalOrderValue: number;
}

interface TotalOverallResult {
  overall: {
    totalOrders: number;
    totalOrderValue: number;
    renewal: OrderData;
    newBusiness: OrderData;
  };
}

const OrderChart: React.FC<{ data: TotalOverallResult }> = ({ data }) => {
  const { overall } = data;

  const chartData = {
    labels: ["Renewal", "New Business"],
    datasets: [
      {
        label: "Order Value",
        data: [
          overall?.renewal?.totalOrderValue,
          overall?.newBusiness?.totalOrderValue,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const orderValue = context.raw; // This refers to the total order value
            const totalOrders =
              label === "Renewal"
                ? overall?.renewal?.totalOrders
                : overall?.newBusiness?.totalOrders;

            return [
              label,
              `Total Order Value: $${orderValue}`,
              `Total Orders: ${totalOrders}`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-center">
      <h2>Order Value Distribution</h2>
      {/* <Pie data={chartData} options={options} /> */}
      <div
        // style={{
        //   height: "400px",
        //   width: "400px",
        // }}
        className="h-[200px] w-[200px] md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px]"
      >
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OrderChart;
