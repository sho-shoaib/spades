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
