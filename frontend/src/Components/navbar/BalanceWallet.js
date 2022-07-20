import React, { useState } from "react";
import ether from "../../assets/coins/ether.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyMenuItem from "./CurrencyMenuItem";
import WalletDepositModal from "./WalletDepositModal";

const BalanceWallet = () => {
  const [anchorCurrencyEl, setAnchorCurrencyEl] = useState(null);
  const openCurrencyEl = Boolean(anchorCurrencyEl);
  const [openWallet, setOpenWallet] = useState(false);

  const handleCurrencyEl = (event) => {
    setAnchorCurrencyEl(event.currentTarget);
  };
  const handleCloseCurrencyEl = () => {
    setAnchorCurrencyEl(null);
  };

  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);

  return (
    <div
      style={{ backgroundColor: "#1E2024" }}
      className='rounded-full flex items-center h-full overflow-hidden'
    >
      <div
        id='currency'
        className=' flex flex-col h-full cursor-pointer pl-4'
        onClick={handleCurrencyEl}
      >
        <div className='flex items-center'>
          <div className='w-5 bg-gray-400 rounded-full mr-2'>
            <img src={ether} alt='ethereum logo' className='w-full' />
          </div>
          <div>
            <p className='font-semibold opacity-70 text-sm'>ETH</p>
          </div>
          <div>
            <ArrowDropDownIcon className='text-sm' />
          </div>
        </div>
        <div>
          <p className='font-semibold opacity-90 -translate-y-1.5 translate-x-1'>
            0.00000
          </p>
        </div>
      </div>
      <CurrencyMenuItem
        anchorEl={anchorCurrencyEl}
        open={openCurrencyEl}
        handleClose={handleCloseCurrencyEl}
      />
      <div id='wallet' className='h-full'>
        <button
          className='h-full px-4 rounded-full text-base font-bold flex items-center gap-1 text-gray-100'
          style={{ backgroundColor: "#5F22D1" }}
          onClick={handleOpenWallet}
        >
          <AccountBalanceWalletIcon fontSize='medium' />
          WALLET
        </button>
      </div>
      <WalletDepositModal
        openWallet={openWallet}
        handleCloseWallet={handleCloseWallet}
      />
    </div>
  );
};

export default BalanceWallet;
