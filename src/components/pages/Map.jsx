import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";
import GeographyChart from "../interface/GeographyChart";
import Header from "../interface/Header";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function Map() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <div className="app">
        <Nav />
        <main className="content">
          <Topbar />
          <GeographyChart />
        </main>
      </div>
    </>
  );
}
