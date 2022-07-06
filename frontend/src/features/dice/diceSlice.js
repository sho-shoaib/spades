import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betting: false,
  betAmt: 100,
  underNo: 50,
  landsOn: 50,
  win: null,
  cashoutAt: null,
};

const diceSlice = createSlice({
  name: "dice",
  initialState,
  reducers: {
    changeBetAmt: (state, { payload }) => {
      state.betAmt = payload.betAmt;
    },
    changeBetting: (state, { payload }) => {
      state.betting = payload.betting;
    },
    changeUnderNo: (state, { payload }) => {
      state.underNo = payload.underNo;
    },
    changeLandsOn: (state, { payload }) => {
      state.landsOn = payload.landsOn;
    },
    changeWin: (state, { payload }) => {
      state.win = payload.win;
    },
    changeCashoutAt: (state) => {
      state.cashoutAt = (state.cashoutAt * 1.099).toFixed(2);
    },
    initializeCashoutAt: (state) => {
      state.cashoutAt = state.betAmt;
    },
    refreshCashoutAt: (state) => {
      state.cashoutAt = null;
    },
  },
});

export const {
  changeBetAmt,
  changeBetting,
  changeUnderNo,
  changeLandsOn,
  changeWin,
  changeCashoutAt,
  initializeCashoutAt,
  refreshCashoutAt,
} = diceSlice.actions;
export default diceSlice.reducer;
