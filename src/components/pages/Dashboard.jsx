import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../interface/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { tokens } from "../../theme";

import DataTable from "../interface/DataTable";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
                >
                  <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                  Download Reports
                </Button>
              </Box>
              <DataTable />
            </Box>
          </Box>
        </main>
      </div>
    </>
  );
}
