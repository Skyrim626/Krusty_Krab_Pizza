import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("../components/pages/Login"));
const Dashboard = React.lazy(() => import("../components/pages/Dashboard"));
const People = React.lazy(() => import("../components/pages/People"));
const Chart = React.lazy(() => import("../components/pages/Chart"));
const Forms = React.lazy(() => import("../components/pages/Forms"));
const Help = React.lazy(() => import("../components/pages/Help"));
const Map = React.lazy(() => import("../components/pages/Map"));
const Table = React.lazy(() => import("../components/pages/Table"));

export default function AppRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/people" element={<People />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/form" element={<Forms />} />
          <Route path="/help" element={<Help />} />
          <Route path="/map" element={<Map />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
