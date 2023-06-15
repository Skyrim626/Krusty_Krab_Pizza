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
import Header from "../interface/Header";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";

import DataTable from "../interface/DataTable";

// Headers for Runners Data
const runnerHeaders = [
  { field: "runner_id", headerName: "ID", width: 70 },
  { field: "first_name", headerName: "First Name", width: 130 },
  { field: "last_name", headerName: "Last Name", width: 130 },
  { field: "age", headerName: "Age", width: 130 },
  { field: "birth_date", headerName: "Birth Date", width: 130 },
  { field: "registration_date", headerName: "Registration Date", width: 130 },
];

export default function Forms() {
  // Get Runner Data
  const [runners, setRunners] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/getAllRunner.php")
      .then((res) => res.json())
      .then((data) => {
        const modifiedData = data.map((runners) => ({
          ...runners,
          id: runners.runner_id,
        }));
        setRunners(modifiedData);
      })
      .catch((error) => {
        console.error("Error retrieving customer data:", error);
      });
  }, []);

  ////////////////////////////////

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fData = new FormData(event.currentTarget);

    axios
      .post("http://localhost/backend/insertRunner.php", fData)
      .then((response) => alert("Data Inserted Successfully!"))
      .catch((error) => alert(error));
  };

  // This Function sets the age of the user whenever the user selects a Date
  const [selectedDate, setSelectedDate] = useState("");
  const [age, setAge] = useState("");

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    calculateAge(selectedDate);
  };

  const calculateAge = (date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    setAge(age);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${day}-${month}-${year}`; // Change the format as desired
  };

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

  const handleUpload = (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost/backend/insertPizzaToppings.php", formData)
        .then((response) => {
          console.log(response.data);
          // Handle successful response
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle error
        });
    }
  };

  // Function for uploading XML Pizza Names
  const handleXML = (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost/backend/insertPizzaNames.php", formData)
        .then((response) => {
          console.log(response.data);
          // Handle successful response
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle error
        });
    }
  };

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
              <Header title="Forms" subtitle="List of Forms" />
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
                    Runner's Registration
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
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          required
                          fullWidth
                          id="age"
                          label="Age"
                          name="age"
                          value={age}
                          inputProps={{
                            pattern: "[0-9]*", // Accepts only numbers
                            inputMode: "numeric", // Shows numeric keyboard on mobile devices
                            title: "Please enter a valid age", // Error message for invalid input
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          required
                          fullWidth
                          id="date"
                          name="date"
                          autoComplete="off"
                          onChange={handleDateChange}
                          value={selectedDate}
                          type="date"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Register
                    </Button>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <div style={{ textAlign: "center" }}>
                  <Header title="" subtitle="Upload Pizza Topping" />
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
                  bgcolor={
                    isDragOver ? "rgba(0, 174, 239, 0.1)" : "transparent"
                  }
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
                    Upload
                  </Button>
                </Box>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Header title="" subtitle="Upload Pizza Names" />
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
                  bgcolor={
                    isDragOver ? "rgba(0, 174, 239, 0.1)" : "transparent"
                  }
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
                    onClick={handleXML}
                    sx={{ mt: 2 }}
                  >
                    Upload
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                {runners && (
                  <DataTable n_rows={runners} n_columns={runnerHeaders} />
                )}
              </Grid>
            </Grid>
          </Box>
        </main>
      </div>
    </>
  );
}
