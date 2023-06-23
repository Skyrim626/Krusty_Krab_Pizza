import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("../components/pages/Login"));
const Dashboard = React.lazy(() => import("../components/pages/Dashboard"));
const Customers = React.lazy(() => import("../components/pages/Customers"));
const People = React.lazy(() => import("../components/pages/People"));
const RunnersPizza = React.lazy(() =>
  import("../components/pages/RunnersPizza")
);
const Table = React.lazy(() => import("../components/pages/Table"));

export default function AppRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/people" element={<People />} />
          <Route path="/pizza_runners" element={<RunnersPizza />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
