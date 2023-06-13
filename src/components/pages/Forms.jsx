import Topbar from "../interface/Topbar";
import Nav from "../interface/Nav";
import { Box, Grid } from "@mui/material";
import Header from "../interface/Header";

export default function Forms() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
              mb="15spx"
            >
              <Header title="Forms" subtitle="List of Forms" />
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                Meow
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                Hello World
              </Grid>
            </Grid>
          </Box>
        </main>
      </div>
    </>
  );
}
