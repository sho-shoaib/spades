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
  multipliers: [0.0, 13.18, 9.88, 7.41, 5.56, 4.17, 3.12, 2.34, 1.76, 1.32],
  row: 0,
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
} = towerLegendSlice.actions;
export default towerLegendSlice.reducer;
