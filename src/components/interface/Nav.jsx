import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TableViewIcon from "@mui/icons-material/TableView";
import { useNavigate } from "react-router-dom";

const Item = ({ title, to, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <MenuItem
      style={{
        color: colors.grey[100],
      }}
      icon={icon}
      onClick={handleClick}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default function Nav() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Box backgroundColor={colors.primary[400]} borderRadius="3px">
        <Sidebar
          collapsed={isCollapsed}
          backgroundColor={colors.primary[400]}
          style={{ height: "100vh" }}
        >
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[800],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    Pizza Runner
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {!isCollapsed && (
              <Box mb="25px">
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Zin
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    VP Fancy Admin
                  </Typography>
                </Box>
              </Box>
            )}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
              />
              <Item
                title="Customers"
                to="/people"
                icon={<PeopleOutlinedIcon />}
              />
              <Item
                title="Contacts"
                to="/contacts"
                icon={<ContactsOutlinedIcon />}
              />
              {/* <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data Table
              </Typography> */}
              <Item title="Table" to="/table" icon={<TableViewIcon />} />
              <Item title="Chart" to="/chart" icon={<BarChartOutlinedIcon />} />
              <Item
                title="Help"
                to="/help"
                icon={<HelpOutlineOutlinedIcon />}
              />
              <Item title="Map" to="/map" icon={<MapOutlinedIcon />} />
            </Box>
          </Menu>
        </Sidebar>
      </Box>
    </>
  );
}
