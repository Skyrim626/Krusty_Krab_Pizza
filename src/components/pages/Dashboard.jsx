import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Grid,
  Container,
  Card,
} from "@mui/material";
import Header from "../interface/Header";
import { tokens } from "../../theme";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { DataGrid } from "@mui/x-data-grid";

import { useState, useEffect } from "react";
import DataTable from "../interface/DataTable";


// Headers for Pizza Toppings
const pizza_toppings = [
  { field: "topping_id", headerName: "ID", width: 70 },
  { field: "topping_name", headerName: "Topping Name", width: 130 },
];

export default function Dashboard() {

  // Get Pizza Topping Data
  const [topping, setTopping] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/pizzaToppings.php")
      .then((res) => res.json())
      .then((data) => {
        const modifiedData = data.map((topping) => ({
          ...topping,
          id: topping.topping_id,
        }));
        setTopping(modifiedData);
      })
      .catch((error) => {
        console.error("Error retrieving customer data:", error);
      });
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  ///////////////////////////////
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
              <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    py: 5,
                    boxShadow: 0,
                    textAlign: "center",
                    backgroundColor: " #3498DB",
                  }}
                >
                  <div
                    style={{
                      margin: "auto",
                      display: "flex",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <LocalShippingIcon fontSize="large" />
                  </div>

                  <Typography variant="h3">Hello World</Typography>
                  <Typography variant="h6" sx={{ opacity: 0.8 }}>
                    Total Runners
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    py: 5,
                    boxShadow: 0,
                    textAlign: "center",
                    backgroundColor: " #2ECC71",
                  }}
                >
                  <div
                    style={{
                      margin: "auto",
                      display: "flex",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <LocalPizzaIcon fontSize="large" />
                  </div>
                  <Typography variant="h3">Hello World</Typography>
                  <Typography variant="h6" sx={{ opacity: 0.72 }}>
                    Total Pizzas Solds
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    py: 5,
                    boxShadow: 0,
                    textAlign: "center",
                    backgroundColor: "#F39C12",
                  }}
                >
                  <div
                    style={{
                      margin: "auto",
                      display: "flex",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <AcUnitIcon fontSize="large" />
                  </div>
                  <Typography variant="h3">Hello World</Typography>
                  <Typography variant="h6" sx={{ opacity: 0.72 }}>
                    Total Customers
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    py: 5,
                    boxShadow: 0,
                    textAlign: "center",
                    backgroundColor: " #9B59B6",
                  }}
                >
                  <div
                    style={{
                      margin: "auto",
                      display: "flex",
                      borderRadius: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <DisabledByDefaultIcon fontSize="large" />
                  </div>
                  <Typography variant="h3">Hello World</Typography>
                  <Typography variant="h6" sx={{ opacity: 0.72 }}>
                    Cancelled Orders
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} sm={12} md={8}>
                <Header
                  title="Pizza's Orders"
                  subtitle="Pizza Names and their solds"
                />
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
                  <div
                    style={{ height: 430, width: "100%", overflowX: "auto" }}
                  >
                    {codeCard2 && <DataGrid rows={codeCard2} columns={card2} />}
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div style={{ textAlign: "right" }}>
                  <Header
                    title="Pizzas Toppings"
                    subtitle="List of Pizza Toppings"
                  />
                </div>
                {topping && <DataTable n_rows={topping} n_columns={pizza_toppings} />}
                
              </Grid>
            </Grid>
          </Box>
        </main>
      </div>
    </>
  );
}
