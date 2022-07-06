import { configureStore } from "@reduxjs/toolkit";
import coinFlipSlice from "./features/coinFlip/coinFlipSlice";
import crashSlice from "./features/crash/crashSlice";
import diceSlice from "./features/dice/diceSlice";
import wheelSlice from "./features/wheel/wheelSlice";

export const store = configureStore({
  reducer: {
    crash: crashSlice,
    coinFlip: coinFlipSlice,
    wheel: wheelSlice,
    dice: diceSlice,
  },
});
