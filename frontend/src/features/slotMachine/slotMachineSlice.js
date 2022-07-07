import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betting: false,
  betAmt: 100,
  cashoutAt: null,
  fruitsArr: ["Apple", "Banana", "Cherry"],
  lost: false,
  jackpot: false,
  equalTerms: 0,
};

const slotMachineSlice = createSlice({
  name: "slotMachine",
  initialState,
  reducers: {
    changeBetAmt: (state, { payload }) => {
      state.betAmt = payload.betAmt;
    },
    changeBetting: (state, { payload }) => {
      state.betting = payload.betting;
    },
    changeCashoutAtWin: (state) => {
      state.cashoutAt = (state.cashoutAt * 1.01).toFixed(2);
    },
    changeCashoutAtJackpot: (state) => {
      state.cashoutAt = (state.cashoutAt * 1.1).toFixed(2);
    },
    initializeCashoutAt: (state) => {
      state.cashoutAt = state.betAmt;
    },
    refreshCashoutAt: (state) => {
      state.cashoutAt = null;
    },
    changeFruitsArr: (state, { payload }) => {
      state.fruitsArr = payload.fruitsArr;
    },
    changeLost: (state, { payload }) => {
      state.lost = payload.lost;
    },
    changeJackpot: (state, { payload }) => {
      state.jackpot = payload.jackpot;
    },
    changeEqualTerms: (state, { payload }) => {
      state.equalTerms = payload.equalTerms;
    },
  },
});

export const {
  changeBetAmt,
  changeBetting,
  changeCashoutAtWin,
  changeCashoutAtJackpot,
  initializeCashoutAt,
  refreshCashoutAt,
  changeFruitsArr,
  changeLost,
  changeJackpot,
  changeEqualTerms,
} = slotMachineSlice.actions;
export default slotMachineSlice.reducer;
