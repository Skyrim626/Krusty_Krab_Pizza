import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CameraIcon from "@mui/icons-material/PhotoCamera";

const defaultTheme = createTheme();

export default function CustomerDashboard() {
  const [pizzaNames, setPizzaNames] = useState([]);

  const fetchPizzaNames = async () => {
    try {
      const response = await fetch(
        "http://localhost/backend/getPizzaNames.php"
      );
      const data = await response.json();
      setPizzaNames(data);
    } catch (error) {
      console.error("Error fetching pizza names:", error);
    }
  };

  useEffect(() => {
    fetchPizzaNames();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Pizza Runner
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box sx={{ bgcolor: "background.paper", pt: 8, pb: 6 }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Pizza Menu
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Did you know that over 115 million kilograms of pizza is consumed
              daily worldwide??? (Well according to Wikipedia anyway…) Danny was
              scrolling through his Instagram feed when something really caught
              his eye - “80s Retro Styling and Pizza Is The Future!”
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {pizzaNames.map((pizza, index) => {
              console.log(pizza.pizza_image); // Log the value of pizza.pizza_image

              return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9

                        width: 350,
                        height: 250,
                      }}
                    >
                      <img
                        src={`../../src/images/menu/${pizza.pizza_image}`}
                        alt={pizza.pizza_name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {pizza.pizza_name}
                      </Typography>
                      <Typography>₱{pizza.price}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Place Order</Button>
                      <Button size="small"></Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
