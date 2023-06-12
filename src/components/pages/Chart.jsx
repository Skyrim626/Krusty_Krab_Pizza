import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";
import BarChart from "../interface/Barchart";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../interface/Header";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

export default function Chart() {
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
              <Header title="Bar Chart" subtitle="Total Orders" />
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
          <BarChart />
        </main>
      </div>
    </>
  );
}
