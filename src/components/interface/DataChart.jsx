import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

const CustomBarChart = ({ margin }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from PHP endpoint
    fetch("http://localhost/backend/barchartData.php")
      .then((response) => response.json())
      .then((data) => setChartData(data));
  }, []);

  return (
    <div style={{ width: "100%", height: 400, margin, marginTop: "40px" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Pizza Order Count
      </Typography>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="pizza_name"
            tick={{ fontSize: 10 }}
            interval={0}
            angle={45}
            textAnchor="start"
            height={80}
            style={{ marginBottom: 20 }}
          />
          <YAxis domain={[0, 20]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total_Orders" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
