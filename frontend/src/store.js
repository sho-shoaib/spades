import { configureStore } from "@reduxjs/toolkit";
import coinFlipSlice from "./features/coinFlip/coinFlipSlice";
import crashSlice from "./features/crash/crashSlice";
import diceSlice from "./features/dice/diceSlice";
import minesSlice from "./features/mines/minesSlice";
import slotMachineSlice from "./features/slotMachine/slotMachineSlice";
import towerLegendSlice from "./features/towerLegend/towerLegendSlice";
import wheelSlice from "./features/wheel/wheelSlice";

export const store = configureStore({
  reducer: {
    crash: crashSlice,
    coinFlip: coinFlipSlice,
    wheel: wheelSlice,
    dice: diceSlice,
    slotMachine: slotMachineSlice,
    mines: minesSlice,
    towerLegend: towerLegendSlice,
  },
});
