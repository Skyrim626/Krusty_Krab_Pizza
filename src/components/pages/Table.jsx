import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../interface/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import React, { useEffect, useState } from "react";

// Card 1: Number_of_Customer_orders
// Card 2: Total Customers Orders Per Day

export default function Table() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Use State Area
  // Card 1 -

  const [codeCard1, setCodeCar1] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/numberCustomersOrders.php")
      .then((res) => res.json())
      .then((data) => {
        const modifiedData = data.map((codeCard1) => ({
          ...codeCard1,
          id: codeCard1.customer_id,
        }));
        setCodeCar1(modifiedData);
      })
      .catch((error) => {
        console.error("Error retrieving customer data:", error);
      });
  }, []);

  ///////////////////////////////////////

  // Use State Area
  // Card 2 -

  const [codeCard2, setCodeCar2] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/totalCustomersOrdersPerDay.php")
      .then((res) => res.json())
      .then((data) => {
        const modifiedData = data.map((codeCard2) => ({
          ...codeCard2,
          id: codeCard2.order_date,
        }));
        setCodeCar2(modifiedData);
      })
      .catch((error) => {
        console.error("Error retrieving customer data:", error);
      });
  }, []);

  console.log(codeCard2);

  ///////////////////////////////////////

  // Card 1 Columns:
  const card1 = [
    { field: "customer_id", headerName: "Customer ID", flex: 1 },
    { field: "num_of_orders", headerName: "No. of Orders", flex: 1 },
    { field: "exclusions", headerName: "Exclusions", flex: 1 },
    { field: "extras", headerName: "Extras", flex: 1 },
    { field: "order_date", headerName: "Order Date", flex: 1 },
  ];

  // Card 2 Columns:
  const card2 = [
    { field: "order_date", headerName: "Order Date", flex: 1 },
    { field: "num_of_orders", headerName: "Number of Orders", flex: 1 },
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
                title="Procedure 1"
                subtitle="List of Number of Customers Orders"
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
              <div style={{ height: 430, width: "100%", overflowX: "auto" }}>
                {codeCard1 && <DataGrid rows={codeCard1} columns={card1} />}
              </div>
            </Box>
          </Box>

          <Box m="20px">
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
            >
              <Header
                title="Procedure 2"
                subtitle="List of Total Customers Orders Per Day"
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
              <div style={{ height: 430, width: "100%", overflowX: "auto" }}>
                {codeCard2 && <DataGrid rows={codeCard2} columns={card2} />}
              </div>
            </Box>
          </Box>
        </main>
      </div>
    </>
  );
}
