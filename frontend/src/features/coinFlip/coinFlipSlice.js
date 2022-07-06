import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  betAmt: 100,
  betting: false,
  cashoutAt: null,
  displayData: {},
};

const coinFlipSlice = createSlice({
  name: "coinFlip",
  initialState,
  reducers: {
    changeBetAmt: (state, { payload }) => {
      state.betAmt = payload.betAmt;
    },
    changeBetting: (state, { payload }) => {
      state.betting = payload.betting;
    },
    initializeCashoutAt: (state) => {
      state.cashoutAt = state.betAmt;
    },
    changeCashoutAt: (state) => {
      state.cashoutAt = state.cashoutAt * 1.2;
    },
  },
});

export const {
  changeBetAmt,
  changeBetting,
  initializeCashoutAt,
  changeCashoutAt,
} = coinFlipSlice.actions;
export default coinFlipSlice.reducer;
