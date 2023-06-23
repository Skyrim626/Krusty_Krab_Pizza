import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";
import {
  Box,
  Grid,
  Typography,
  TextField,
  useTheme,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../interface/Header";
import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchBar from "../interface/SearchBar";
import { fetchData } from "../js/api";

export default function Customers() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // For Reset Input Fields
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const postalCodeRef = useRef(null);
  const countryRef = useRef(null);

  // A function that handles the submit in the customer's registration form
  const handleSubmit = (event) => {
    event.preventDefault();
    const fData = new FormData(event.currentTarget);

    axios
      .post("http://localhost/backend/insertNewCustomer.php", fData)
      .then((response) => {
        alert("Data Inserted Successfully!");
        // Clear the input fields
        firstNameRef.current.value = "";
        lastNameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        phoneNumberRef.current.value = "";
        addressRef.current.value = "";
        cityRef.current.value = "";
        stateRef.current.value = "";
        postalCodeRef.current.value = "";
        countryRef.current.value = "";
      })
      .catch((error) => alert(error));
  };

  // Use State Section
  // Get Total Runners Data
  /* const [newlyRegistered, setNewlyRegistered] = useState(null); */

  /* useEffect(() => {
    fetch("http://localhost/backend/get20RecentlyRegistered.php")
      .then((res) => res.json())
      .then((data) => {
        const modifiedData = data.map((newlyRegistered) => ({
          ...newlyRegistered,
          id: newlyRegistered.customer_id,
        }));
        setNewlyRegistered(modifiedData);
      })
      .catch((error) => {
        console.error("Error retrieving customer data:", error);
      });
  }, []); */

  // Column Headers
  /*   const newlyRegisteredHeader = [
    { field: "customer_id", headerName: "ID", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "registration_date", headerName: "Registered Date", flex: 1 },
  ]; */

  // Searching Area Method
  /* const [searchResults, setSearchResults] = useState([]); */

  // Procedure UseState
  const [procedure2, setProcedure2] = useState(null);
  const [procedure3, setProcedure3] = useState(null);
  const [procedure7, setProcedure7] = useState([]);
  const [procedure9, setProcedure9] = useState(null);

  // Procedures UseEffect
  useEffect(() => {
    fetchData("procedure2").then((data) => {
      const modifiedData = data.map((procedure2) => ({
        ...procedure2,
        id: procedure2.order_date,
      }));
      setProcedure2(modifiedData);
    });
  }, []);

  useEffect(() => {
    fetchData("procedure3").then((data) => {
      const modifiedData = data.map((procedure3) => ({
        ...procedure3,
        id: procedure3.customer_id,
      }));
      setProcedure3(modifiedData);
    });
  }, []);

  useEffect(() => {
    fetchData("procedure9").then((data) => {
      const modifiedData = data.map((procedure9) => ({
        ...procedure9,
        id: procedure9.customer_id,
      }));
      setProcedure9(modifiedData);
    });
  }, []);

  // Function for searching method
  const handleSearch = (searchValue) => {
    fetch("http://localhost/backend/searching.php", {
      method: "POST",
      body: JSON.stringify({ searchValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Add a unique id property to each row
        const rowsWithId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setProcedure7(rowsWithId);
      })
      .catch((error) =>
        console.error("Error retrieving search results:", error)
      );
  };

  // Procedure Headers

  const procedure2Header = [
    { field: "order_date", headerName: "Order Date", flex: 1 },
    { field: "num_of_orders", headerName: "No. of Orders", flex: 1 },
  ];

  const procedure3Header = [
    { field: "customer_id", headerName: "ID", flex: 1 },
    { field: "num_of_orders", headerName: "No. of Orders", flex: 1 },
    { field: "exclusions", headerName: "Exclusions", flex: 1 },
    { field: "extras", headerName: "Extras", flex: 1 },
    { field: "order_date", headerName: "Order Date", flex: 1 },
  ];

  const procedure7Header = [
    { field: "order_date", headerName: "Order Date", flex: 1 },
    { field: "num_of_orders", headerName: "Number of Orders", flex: 1 },
  ];

  const procedure9Header = [
    { field: "customer_id", headerName: "ID", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 1 },
    { field: "last_name", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "registration_date", headerName: "Registered Date", flex: 1 },
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
              mb="15px"
            >
              <Header title="Customers Form" subtitle="" />
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <div style={{ textAlign: "left", marginTop: "20px" }}>
                  <Header title="" subtitle="Registration Form" />
                </div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: colors.primary[400],
                    padding: "20px",
                    borderRadius: "15px",
                    height: "85%",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Customers Registration
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          inputRef={firstNameRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="family-name"
                          inputRef={lastNameRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          inputRef={emailRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          name="password"
                          inputRef={passwordRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          fullWidth
                          id="phone_number"
                          label="Phone Number"
                          name="phone_number"
                          inputRef={phoneNumberRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          fullWidth
                          id="address"
                          label="Address"
                          name="address"
                          inputRef={addressRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          required
                          fullWidth
                          id="city"
                          label="City"
                          name="city"
                          inputRef={cityRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          id="state"
                          label="State"
                          name="state"
                          inputRef={stateRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          id="postal_code"
                          label="Postal Code"
                          name="postal_code"
                          inputRef={postalCodeRef}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          fullWidth
                          id="country"
                          label="Country"
                          name="country"
                          inputRef={countryRef}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add Customer
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <div style={{ textAlign: "center" }}>
                  <Header
                    title=""
                    subtitle="Procedure 9: Top 20 Recently Registered Customers"
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
                    <div style={{ height: 580, width: "100%" }}>
                      {procedure9 && (
                        <DataGrid
                          style={{ marginTop: "50px" }}
                          rows={procedure9}
                          columns={procedure9Header}
                        />
                      )}
                    </div>
                  </Box>
                </div>
              </Grid>

              <Grid container spacing={3} item>
                {/* Procedure 2 */}
                <Grid item xs={12} sm={12} md={6}>
                  <div style={{ textAlign: "center" }}>
                    <Header
                      title="Procedure 2"
                      subtitle="Total Customers Orders Per Day"
                    />
                  </div>
                  {procedure2 && (
                    <DataGrid
                      style={{ marginTop: "15px", height: "400px" }}
                      columns={procedure2Header}
                      rows={procedure2}
                    />
                  )}
                </Grid>

                {/* Procedure 3 */}
                <Grid item xs={12} sm={12} md={6}>
                  <div style={{ textAlign: "center" }}>
                    <Header
                      title="Procedure 3"
                      subtitle="Unique Customer Orders"
                    />
                  </div>
                  {procedure3 && (
                    <DataGrid
                      style={{ marginTop: "15px", height: "400px" }}
                      columns={procedure3Header}
                      rows={procedure3}
                    />
                  )}
                </Grid>
              </Grid>

              {/* Procedure 7 */}
              <Grid item xs={12} sm={12} md={12}>
                <div style={{ textAlign: "center" }}>
                  <Header
                    title="Procedure 7"
                    subtitle="Get Total Customer Orders In The Day"
                  />
                </div>
                <SearchBar handleSearch={handleSearch} />
                <DataGrid
                  style={{ marginTop: "15px" }}
                  columns={procedure7Header}
                  rows={procedure7}
                  autoHeight
                />
              </Grid>
            </Grid>
          </Box>
        </main>
      </div>
    </>
  );
}
