import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRoute from "./routes/AppRoute";

export default function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoute />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
