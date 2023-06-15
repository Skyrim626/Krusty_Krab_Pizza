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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../interface/Header";
import { tokens } from "../../theme";

import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { DataGrid } from "@mui/x-data-grid";

import { useState, useEffect } from "react";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DataTable from "../interface/DataTable";
import { saveAs } from "file-saver";

// Headers for Pizza Toppings
const pizza_toppings = [
  { field: "topping_id", headerName: "ID", width: 70 },
  { field: "topping_name", headerName: "Topping Name", width: 130 },
];

// A function that fetches Data's
function fetchData(api) {
  return fetch(api)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error retrieving total runners data:", error);
    });
}

export default function Dashboard() {
  // A function that format the data(Mysql) into XML
  const [data, setData] = useState("");

  const formatDataToXml = (data) => {
    let xmlData = "<root>";
    // Format the data to XML here using the retrieved data
    data.forEach((item) => {
      xmlData += "<item>";
      xmlData += `<order_id>${item.order_id}</order_id>`;
      xmlData += `<runner_id>${item.runner_id}</runner_id>`;
      xmlData += `<customer_id>${item.customer_id}</customer_id>`;
      xmlData += `<pizza_name>${item.pizza_name}</pizza_name>`;
      xmlData += "</item>";
    });
    xmlData += "</root>";
    return xmlData;
  };

  const handleDownload = () => {
    fetch("http://localhost/backend/fetchForDataMart.php")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = formatDataToXml(data);
        const blob = new Blob([formattedData], { type: "application/xml" });
        saveAs(blob, "Data  Mart.xml");
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  };

  // Get Total Runners Data
  const [totalRunners, setTotalRunners] = useState(null);

  useEffect(() => {
    fetchData("http://localhost/backend/getTotalRunners.php").then((data) => {
      setTotalRunners(data);
    });
  }, []);

  // Get Total Customers Data
  const [totalCustomers, setTotalCustomers] = useState(null);

  useEffect(() => {
    fetchData("http://localhost/backend/getTotalCustomers.php").then((data) => {
      setTotalCustomers(data);
    });
  }, []);

  // Get Total Cancelled Orders
  const [totalCancel, setTotalCancel] = useState(null);

  useEffect(() => {
    fetchData("http://localhost/backend/getTotalCancelledOrders.php").then(
      (data) => {
        setTotalCancel(data);
      }
    );
  }, []);

  // Get Total Pizzas Solds
  const [soldPizzas, setSoldPizzas] = useState(null);

  useEffect(() => {
    fetchData("http://localhost/backend/getTotalPizzasSold.php").then(
      (data) => {
        setSoldPizzas(data);
      }
    );
  }, []);

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

  // This area is for handling xml output
  // This is for XML Input
  // Functions for XML

  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    setFile(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const [tableData, setTableData] = useState([]);

  // ...

  const handleUpload = (event) => {
    event.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const xmlData = event.target.result;
        // Parse and process the XML data here

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");
        const parsedData = [];
        for (let i = 0; i < items.length; i++) {
          const orderID =
            items[i].getElementsByTagName("order_id")[0].textContent;
          const runnerID =
            items[i].getElementsByTagName("runner_id")[0].textContent;
          const customerID =
            items[i].getElementsByTagName("customer_id")[0].textContent;
          const pizzaName =
            items[i].getElementsByTagName("pizza_name")[0].textContent;

          // Use the parsed data as needed
          parsedData.push({ id: i, orderID, runnerID, customerID, pizzaName });
        }

        setTableData(parsedData);
      };
      reader.readAsText(file);
    }
  };

  // ...

  const handleTableData = () => {
    return tableData.map((data, index) => (
      <TableRow key={index}>
        <TableCell>{data.orderID}</TableCell>
        <TableCell>{data.runnerID}</TableCell>
        <TableCell>{data.customerID}</TableCell>
        <TableCell>{data.pizzaName}</TableCell>
      </TableRow>
    ));
  };

  // This area is for displaying data that came from XML
  //////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

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
              <Box>
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                  onClick={handleDownload}
                >
                  <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                  Download Reports For Data Mart
                </Button>
              </Box>
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

                  {totalRunners && (
                    <Typography variant="h3">
                      {totalRunners[0].total}
                    </Typography>
                  )}

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
                  {soldPizzas && (
                    <Typography variant="h3">{soldPizzas[0].total}</Typography>
                  )}
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
                  {totalCustomers && (
                    <Typography variant="h3">
                      {totalCustomers[0].total}
                    </Typography>
                  )}

                  <Typography variant="h6" sx={{ opacity: 0.8 }}>
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
                  {totalCancel && (
                    <Typography variant="h3">{totalCancel[0].total}</Typography>
                  )}
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
                {topping && (
                  <DataTable n_rows={topping} n_columns={pizza_toppings} />
                )}
              </Grid>
            </Grid>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Header title="" subtitle="Upload Data Report" />
            </div>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={2}
              border={
                isDragOver
                  ? "2px dashed #00AEEF"
                  : "2px dashed rgba(0, 0, 0, 0.12)"
              }
              borderRadius={8}
              bgcolor={isDragOver ? "rgba(0, 174, 239, 0.1)" : "transparent"}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Typography variant="h4" align="center" gutterBottom>
                Drag and Drop XML File Upload
              </Typography>
              <Typography variant="subtitle1" align="center" gutterBottom>
                {isDragOver
                  ? "Drop the XML file here"
                  : "Drag and drop an XML file here"}
              </Typography>
              <Typography variant="body2" align="center" gutterBottom>
                {file ? `Selected file: ${file.name}` : ""}
              </Typography>
              <input
                type="file"
                accept=".xml"
                id="file-input"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <label htmlFor="file-input">
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  disabled={isDragOver}
                >
                  Select File
                </Button>
              </label>
              <Button
                variant="contained"
                color="primary"
                disabled={!file}
                onClick={handleUpload}
                sx={{ mt: 2 }}
              >
                Display in Table Format
              </Button>
            </Box>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                columns={[
                  { field: "orderID", headerName: "Order ID", width: 150 },
                  { field: "runnerID", headerName: "Runner ID", width: 150 },
                  {
                    field: "customerID",
                    headerName: "Customer ID",
                    width: 150,
                  },
                  { field: "pizzaName", headerName: "Pizza Name", width: 150 },
                ]}
                rows={tableData}
              />
            </div>
          </Box>
        </main>
      </div>
    </>
  );
}
