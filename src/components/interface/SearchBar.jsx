import { useState } from "react";
import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ handleSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleButtonClick = () => {
    handleSearch(searchValue);
  };

  return (
    <Box
      display="flex"
      borderRadius="3px"
      backgroundColor={colors.primary[400]}
    >
      <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search"
        value={searchValue}
        onChange={handleInputChange}
      />
      <IconButton type="button" sx={{ p: 1 }} onClick={handleButtonClick}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
