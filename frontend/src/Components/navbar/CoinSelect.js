import { List, ListItemButton } from "@mui/material";
import React from "react";

const coins = ["ETH", "BNB", "MATIC", "WSOL", "WBNB", "BUSD", "USDT", "USDC"];

const CoinSelect = ({ closeCoinSelect }) => {
  return (
    <>
      <div>
        <div>
          <p className='text-2xl font-semibold ml-2'>Coins</p>
        </div>
        <List>
          {coins.map((coin, i) => {
            return (
              <ListItemButton
                key={i}
                disablePadding
                onClick={() => closeCoinSelect()}
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
    </>
  );
};

export default CoinSelect;
