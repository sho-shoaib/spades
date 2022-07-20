import { Modal } from "@mui/material";
import React, { useState } from "react";
import AddCardIcon from "@mui/icons-material/AddCard";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import etherlogo from "../../assets/coins/ether.png";
import CoinSelect from "./CoinSelect";

const WalletDepositModal = ({ openWallet, handleCloseWallet }) => {
  const [coinSelect, setCoinSelect] = useState(false);

  const openCoinSelect = () => {
    setCoinSelect(true);
  };
  const closeCoinSelect = () => {
    setCoinSelect(false);
  };

  return (
    <Modal
      open={openWallet}
      onClose={handleCloseWallet}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      className='flex justify-center items-center'
    >
      <div
        className='p-6 rounded-xl flex flex-col gap-6 transition-wallet'
        style={{ backgroundColor: "#1E2024" }}
      >
        {coinSelect ? (
          <CoinSelect closeCoinSelect={closeCoinSelect} />
        ) : (
          <>
            <div>
              <p className='text-2xl font-semibold ml-2'>Wallet</p>
            </div>
            <div className='flex flex-col gap-6 items-center'>
              <div className='flex flex-col gap-1.5'>
                <span
                  className='ml-3'
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Deposit Currency
                </span>
                <div
                  style={{
                    backgroundColor: "#17181B",
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                  className='rounded-xl border-2 p-2 flex items-center gap-2'
                >
                  <button
                    className='flex items-center rounded-xl py-3 px-4'
                    style={{ backgroundColor: "#1E2023" }}
                    onClick={openCoinSelect}
                  >
                    <div
                      className='w-7 rounded-full mr-3'
                      style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
                    >
                      <img
                        src={etherlogo}
                        alt='ethereum logo'
                        className='w-full'
                      />
                    </div>
                    <p className='text-xl font-semibold mr-10'>ETH</p>
                    <ArrowDropDownIcon />
                  </button>
                  <input
                    type='number'
                    className='h-10 bg-transparent border-b-2 outline-none w-52 pl-1'
                    placeholder='Amount Here'
                    style={{ borderColor: "rgba(255,255,255,0.3)" }}
                  />
                </div>
              </div>
              <div>
                <button
                  className='flex items-center py-2.5 px-4 rounded-xl gap-1 text-xl transition-all active:scale-95'
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <AddCardIcon />
                  <p className='font-semibold text-lg'>Deposit</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default WalletDepositModal;
