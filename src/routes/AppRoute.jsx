import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("../components/pages/Login"));
const Dashboard = React.lazy(() => import("../components/pages/Dashboard"));
const Customers = React.lazy(() => import("../components/pages/Customers"));
const CustomerDashboard = React.lazy(() =>
  import("../components/pages/CustomerDashboard")
);
const RunnersPizza = React.lazy(() =>
  import("../components/pages/RunnersPizza")
);
const CustomerLogin = React.lazy(() =>
  import("../components/pages/CustomerLogin")
);

export default function AppRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/pizza_runners" element={<RunnersPizza />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
