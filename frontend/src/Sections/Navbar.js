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
import { ethers } from "ethers";
import contracts from "./contractaddresses.json";
import axios from "axios";
import { appConfig } from "./../appConfig";
import Swal from "sweetalert2";
import BalanceWallet from "../Components/navbar/BalanceWallet";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const currencyOptions = [
  "ETH",
  "BNB",
  "MATIC",
  "WSOL",
  "WBNB",
  "BUSD",
  "USDT",
  "USDC",
];

const Navbar = ({ balance, refreshWallet, setBalance }) => {
  let navigate = useNavigate();
  const userName = sessionStorage.username;
  const userEmail = sessionStorage.useremail;

  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState("$");
  const [amount, setAmount] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChange = (type, event) => {
    if (type === "currency") {
      setCurrency(event.target.value || "$");
    } else if (type === "amount") {
      setAmount(Number(event.target.value) || "");
    }
  };

  const handleClickOpen = () => {
    setAmount("");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  /* globals BigInt */
  const handleCloseAdd = async (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
    if (currency !== "" && amount !== 0 && amount !== "") {
      try {
        Swal.fire({
          icon: "warning",
          title:
            "Please wait while the transaction is in progress. Do not refresh the page.",
          showConfirmButton: false,
        });
        // User click OK with input
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        console.log(contracts[currency]);
        const contractIns = new ethers.Contract(
          contracts[currency],
          contracts.abi,
          signer
        );
        const transfer = await contractIns.functions.transfer(
          "0x4345ad49121023CEd135835b44c93f9a6B7fA9E6",
          BigInt(amount * 10 ** 18)
        );
        console.log(transfer);
        const reciept = await transfer.wait();
        if (reciept.status == true) {
          axios
            .post(`${appConfig.API_HOST}user/user/addbalance`, {
              email: userEmail,
              amount: amount * 10 ** 18,
              type: currency,
            })
            .then((response) => {
              console.log(response);
              Swal.fire({
                icon: "success",
                title: "Voilà!",
                text:
                  amount +
                  " " +
                  currency +
                  " has been deposited to your account. Your latest balance is " +
                  (
                    response.data.user[currency.toLowerCase()] /
                    10 ** 18
                  ).toFixed(2) +
                  ".",
                showConfirmButton: true,
              });
              //window.alert(amount+ " "+ currency + " has been deposited to your account. Your latest balance is "+(response.data.user[currency.toLowerCase()]/10**18)+'.')
            })
            .catch((err) => console.log(err));
        }
      } catch (err) {
        window.alert("Please Install Metamask Wallet");
      }
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
    <div
      className='h-16 w-full sticky top-0 flex items-center justify-between px-10 drop-shadow-xl'
      style={{ backgroundColor: "#24262B" }}
    >
      <h1
        className='font-semibold text-2xl cursor-pointer'
        onClick={() => navigate("/")}
      >
        SPADES
      </h1>
      {userEmail || userName ? (
        <div className='flex gap-8 h-full py-2.5'>
          <BalanceWallet />
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
                  {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel htmlFor='amount'>Amount</InputLabel>
                    <Input
                      id='amount'
                      type='number'
                      value={amount}
                      onChange={(e) => handleChange("amount", e)}
                      startAdornment={
                        <InputAdornment position='start'>
                          {currency}
                        </InputAdornment>
                      }
                    />
                  </FormControl> */}
                  <TextField
                    id='standard-basic'
                    label='Amount'
                    variant='standard'
                    style={{
                      m: 1,
                      minWidth: 200,
                    }}
                  />
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
