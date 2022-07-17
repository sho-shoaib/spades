import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betting: false,
  betAmt: 100,
  underNo: 50,
  landsOn: 50,
  win: null,
  cashoutAt: 0,
  multiplier: 1.98,
  winAmt: 100 * 1.98,
  game: 0,
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
      state.cashoutAt = state.winAmt;
    },
    initializeCashoutAt: (state) => {
      state.cashoutAt = state.betAmt;
    },
    refreshCashoutAt: (state) => {
      state.cashoutAt = 0;
    },
    changeMultiplier: (state, { payload }) => {
      state.multiplier = payload.multiplier;
    },
    changeWinAmt: (state, { payload }) => {
      state.winAmt = payload.winAmt;
    },
    changeGame: (state, { payload }) => {
      state.game = payload.game;
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
  changeMultiplier,
  changeWinAmt,
  changeGame,
} = diceSlice.actions;
export default diceSlice.reducer;
