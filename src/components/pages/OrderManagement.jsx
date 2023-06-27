import Nav from "../interface/Nav";
import Header from "../interface/Header";
import Topbar from "../interface/Topbar";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const apiUrl = "http://localhost/backend/runnerOrders.php";

export default function OrderManagement() {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    const editedItem = data.find((item) => item.order_id === id);
    setEditedData({ ...editedItem });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${apiUrl}?order_id=${id}`, editedData);
      const updatedData = data.map((item) =>
        item.order_id === id ? { ...item, ...editedData } : item
      );
      setData(updatedData);
      setEditedData({});
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating data:", error);
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
              <Header title="Order Management" subtitle="" />
            </Box>
          </Box>
          <Box
            height="800px" // Set the desired height for the table
            overflow="auto" // Add scroll bar when necessary
            margin={"20px"}
            style={{
              borderRadius: "5px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              overflow: "auto",
              border: "2px solid #000000", // Set the border thickness and color
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ border: "1px solid black" }}>
                      Order ID
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      Runner ID
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      Pickup Time
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      Distance
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      Duration
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      Cancellation
                    </TableCell>
                    <TableCell style={{ border: "1px solid black" }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    <TableRow
                      key={item.order_id}
                      style={{ border: "1px solid black" }}
                    >
                      <TableCell style={{ border: "1px solid black" }}>
                        {item.order_id}
                      </TableCell>
                      <TableCell style={{ border: "1px solid black" }}>
                        {item.runner_id}
                      </TableCell>
                      <TableCell style={{ border: "1px solid black" }}>
                        {item.pickup_time}
                      </TableCell>
                      <TableCell style={{ border: "1px solid black" }}>
                        {item.distance}
                      </TableCell>
                      <TableCell style={{ border: "1px solid black" }}>
                        {item.duration}
                      </TableCell>
                      <TableCell style={{ border: "1px solid black" }}>
                        {editedData.order_id === item.order_id ? (
                          <TextField
                            name="cancellation"
                            value={editedData.cancellation || ""}
                            onChange={handleInputChange}
                          />
                        ) : (
                          item.cancellation
                        )}
                      </TableCell>
                      <TableCell style={{ border: "1px solid black" }}>
                        {editedData.order_id === item.order_id ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdate(item.order_id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() =>
                              setEditedData({
                                order_id: item.order_id,
                                cancellation: item.cancellation,
                              })
                            }
                          >
                            Edit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </main>
      </div>
    </>
  );
}
