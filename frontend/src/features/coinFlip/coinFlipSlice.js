import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  betAmt: 100,
  betting: false,
  cashoutAt: null,
  displayData: { empty: true },
  series: 0,
  startAnimation: false,
  multiplier: 0.0,
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
    changeCashoutAt: (state, { payload }) => {
      state.cashoutAt = payload.cashoutAt;
    },
    changeSeries: (state, { payload }) => {
      if (payload.series === "add") {
        state.series += 1;
      } else if (payload.series === "re") {
        state.series = 0;
      }
    },
    changeAnimation: (state, { payload }) => {
      state.startAnimation = payload.startAnimation;
    },
    setDisplayData: (state, { payload }) => {
      state.displayData = payload.displayData;
    },
    changeMultiplier: (state, { payload }) => {
      state.multiplier = payload.multiplier;
    },
  },
});

export const {
  changeBetAmt,
  changeBetting,
  initializeCashoutAt,
  changeCashoutAt,
  changeSeries,
  changeAnimation,
  setDisplayData,
  changeMultiplier,
} = coinFlipSlice.actions;
export default coinFlipSlice.reducer;
