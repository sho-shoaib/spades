import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  betAmt: 100,
  betting: false,
  cashoutAt: null,
  game: 0,
  checkWhat: [],
  gameEnd: false,
  looseText: "",
  cashoutAt: 0,
  easyMultipliers: [0.0, 13.18, 9.88, 7.41, 5.56, 4.17, 3.12, 2.34, 1.76, 1.32],
  mediumMultipliers: [
    0.0, 38.05, 25.37, 16.91, 11.27, 7.51, 5.01, 3.34, 2.22, 1.48,
  ],
  hardMultipliers: [
    0.0, 506.88, 253.44, 126.72, 63.36, 31.68, 15.84, 7.92, 3.96, 1.98,
  ],
  extremeMultipliers: [0.0, 721.71, 240.57, 80.19, 26.73, 8.91, 2.97],
  nightmareMultipliers: [0.0, 4055.04, 1013.76, 253.44, 63.36, 15.84, 3.96],
  row: 0,
  mode: 0,
  cols: 4,
};

const towerLegendSlice = createSlice({
  name: "towerLegend",
  initialState,
  reducers: {
    changeBetting: (state, { payload }) => {
      state.betting = payload.betting;
    },
    changeLoading: (state, { payload }) => {
      state.loading = payload.loading;
    },
    changeBetAmt: (state, { payload }) => {
      state.betAmt = payload.betAmt;
    },
    changeCashoutAt: (state, { payload }) => {
      state.cashoutAt = payload.cashoutAt;
    },
    changelooseText: (state, { payload }) => {
      state.looseText = payload.looseText;
    },
    changeGameEnd: (state, { payload }) => {
      state.gameEnd = payload.gameEnd;
    },
    changeGame: (state, { payload }) => {
      state.game = payload.game;
    },
    changeCheckWhat: (state, { payload }) => {
      state.checkWhat = payload.checkWhat;
    },
    changeMode: (state, { payload }) => {
      state.mode = payload.mode;
    },
    changeCols: (state, { payload }) => {
      state.cols = payload.cols;
    },
  },
});

export const {
  changeBetting,
  changeLoading,
  changeBetAmt,
  changeCashoutAt,
  changelooseText,
  changeGameEnd,
  changeGame,
  changeCheckWhat,
  changeMode,
  changeCols,
} = towerLegendSlice.actions;
export default towerLegendSlice.reducer;
