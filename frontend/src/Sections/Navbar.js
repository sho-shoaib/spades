import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaDollarSign } from "react-icons/fa";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { socket } from "../App";
import { Input, InputAdornment, TextField } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const currencyOptions = ["$", "€", "฿", "₹"];

const Navbar = ({ balance, refreshWallet, setBalance }) => {
  let navigate = useNavigate();
  const userName = sessionStorage.username;
  const userEmail = sessionStorage.useremail;

  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState("$");
  const [amount, setAmount] = useState(0);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChange = (type, event) => {
    if (type === "currency") {
      setCurrency(event.target.value || "$");
    } else if (type === "amount") {
      setAmount(Number(event.target.value) || 0);
    }
  };

  const handleClickOpen = () => {
    setAmount(0);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleCloseAdd = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
    if (currency !== "" && amount !== 0) {
      // User click OK with input
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    refreshWallet();
  }, []);

  return (
    <div className='h-16 w-full sticky top-0 bg-slate-900 flex items-center justify-between px-10  border-b-2 border-slate-700'>
      <h1
        className='font-semibold text-2xl cursor-pointer'
        onClick={() => navigate("/")}
      >
        SPADES
      </h1>
      {userEmail || userName ? (
        <div className='flex gap-8'>
          <div className='bg-slate-600 rounded-full pr-3.5 flex items-center gap-2 pl-0.5 py-0.5'>
            <div className='rounded-full p-2 bg-slate-500'>
              <FaDollarSign />
            </div>
            <p className='text-xl font-semibold inline -translate-y-0.5'>
              {balance.toFixed(2)}
            </p>
          </div>
          <div>
            <button
              onClick={handleClickOpen}
              className='bg-slate-600 py-2 px-4 rounded-full hover:bg-slate-500 transition duration-300 active:bg-slate-600'
            >
              <p>Deposit Amount</p>
            </button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle className='bg-slate-200'>
                <p className='translate-x-2 mb-2'>Fill The Form</p>
              </DialogTitle>
              <DialogContent className='bg-slate-200'>
                <Box
                  component='form'
                  sx={{ display: "flex", flexWrap: "wrap" }}
                >
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel htmlFor='standard-adornment-amount'>
                      Amount
                    </InputLabel>
                    <Input
                      id='standard-adornment-amount'
                      value={amount}
                      onChange={(e) => handleChange("amount", e)}
                      startAdornment={
                        <InputAdornment position='start'>
                          {currency}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id='demo-dialog-select-label'>
                      Currency
                    </InputLabel>
                    <Select
                      labelId='demo-dialog-select-label'
                      id='demo-dialog-select'
                      value={currency}
                      onChange={(e) => handleChange("currency", e)}
                      input={<OutlinedInput label='Currency' />}
                    >
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                      {currencyOptions.map((item, i) => {
                        return (
                          <MenuItem key={i} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContent>
              <DialogActions className='bg-slate-200'>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCloseAdd}>Deposit</Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className='bg-slate-600 rounded-full pr-3.5 flex items-center gap-2 pl-0.5 py-0.5'>
            <div className='rounded-full p-2 bg-slate-500'>
              <FaUser />
            </div>
            <p className='text-xl font-semibold inline -translate-y-0.5'>
              {userName}
            </p>
          </div>
        </div>
      ) : (
        <div className='flex gap-10'>
          <div>
            <p
              className='text-xl font-semibold mb-4 underline underline-offset-1 cursor-pointer inline'
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          </div>
          <div>
            <p
              className='text-xl font-semibold mb-4 underline underline-offset-1 cursor-pointer inline'
              onClick={() => navigate("/signup")}
            >
              Signup
            </p>
          </div>
        </div>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: "100%" }}
        >
          {currency}
          {amount} Cash Added!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Navbar;
