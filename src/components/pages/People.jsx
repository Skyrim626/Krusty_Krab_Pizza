import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../interface/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import React, { useEffect, useState } from "react";

export default function People() {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/customer.php")
      .then((res) => res.json())
      .then((data) => {
        const modifiedData = data.map((customer) => ({
          ...customer,
          id: customer.customer_id,
        }));
        setCustomers(modifiedData);
      })
      .catch((error) => {
        console.error("Error retrieving customer data:", error);
      });
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "customer_id", headerName: "ID" },
    { field: "first_name", headerName: "First Name" },
    { field: "last_name", headerName: "Last Name" },
    { field: "email", headerName: "Email", width: 150 },
    { field: "password", headerName: "Password", width: 200 },
    { field: "phone_number", headerName: "Phone Number" },
    { field: "address", headerName: "Address", width: 130 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State" },
    { field: "postal_code", headerName: "Postal Code" },
    { field: "country", headerName: "Country" },
    { field: "registration_date", headerName: "Reg_date", width: 150 },
  ];

  return (
    <>
      <div className="app">
        <Nav />
        <main className="content">
          <Topbar />
          <Box m="20px">
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Header
                title="CUSTOMERS"
                subtitle="List of Registered Customers"
              />
              <Box>
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                  Download Reports
                </Button>
              </Box>
            </Box>
            <Box
              m="3px 0 0 0"
              height="70vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              <div style={{ height: 600, width: "100%", overflowX: "auto" }}>
                {customers && <DataGrid rows={customers} columns={columns} />}
              </div>
            </Box>
          </Box>
        </main>
      </div>
    </>
  );
}
