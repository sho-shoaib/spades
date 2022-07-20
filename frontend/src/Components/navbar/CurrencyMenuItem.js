import React from "react";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

const coins = ["ETH", "BNB", "MATIC", "WSOL", "WBNB", "BUSD", "USDT", "USDC"];

const CurrencyMenuItem = ({ anchorEl, open, handleClose }) => {
  const handleCoinClick = () => {
    handleClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      className='-translate-x-10 translate-y-3'
    >
      <div
        className='w-full h-full rounded px-5 py-3 text-white'
        style={{ backgroundColor: "#17181B" }}
      >
        <div>
          <p className='font-bold text-xl mb-1'>Crypto</p>
        </div>
        <List>
          {coins.map((coin, i) => {
            return (
              <ListItemButton
                key={i}
                disablePadding
                onClick={() => handleCoinClick()}
              >
                <div
                  className='flex items-center justify-between gap-28 w-full'
                  key={i}
                >
                  <p className='text-md font-semibold'>{coin}</p>
                  <p className='font-semibold text-base'>0.000000</p>
                </div>
              </ListItemButton>
            );
          })}
        </List>
      </div>
    </Popover>
  );
};

export default CurrencyMenuItem;
