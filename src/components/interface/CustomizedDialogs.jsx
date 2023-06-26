import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 400,
    height: 100,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ pizza, customer }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrder = () => {
    const fData = {
      pizza_id: parseInt(pizza.pizza_id),
      customer_id: customer.customer_id,
    };

    axios
      .post("http://localhost/backend/placeOrder.php", JSON.stringify(fData))
      .then((response) => {
        console.log(response.data);
        alert("Data Inserted Successfully!");
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Place Order
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
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
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {pizza.pizza_name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Price: ₱{pizza.price}</Typography>
          {/* Add more details specific to the pizza order */}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleOrder}>
            Order Now
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
