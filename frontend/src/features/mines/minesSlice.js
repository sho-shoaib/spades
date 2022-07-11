import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betting: false,
  betAmt: 100,
  cashoutAt: 0,
  checkWhat: "",
  game: 0,
  totalProfit: [100, 1.0],
  nextProfit: [102, 1.02],
  tiles: 1,
};

const diceSlice = createSlice({
  name: "mines",
  initialState,
  reducers: {
    changeBetting: (state, { payload }) => {
      state.betting = payload.betting;
    },
    changeBetAmt: (state, { payload }) => {
      state.betAmt = payload.betAmt;
    },
    changeCashoutAt: (state, { payload }) => {
      state.cashoutAt = payload.cashoutAt;
    },
    changeCheckWhat: (state, { payload }) => {
      state.checkWhat = payload.checkWhat;
    },
    changeGame: (state, { payload }) => {
      state.game = payload.game;
    },
    changeTotalProfit: (state, { payload }) => {
      state.totalProfit = payload.totalProfit;
    },
    changeNextProfit: (state, { payload }) => {
      state.nextProfit = payload.nextProfit;
    },
    changeTiles: (state, { payload }) => {
      state.tiles = payload.tiles;
    },
  },
});

export const {
  changeBetting,
  changeBetAmt,
  changeCashoutAt,
  changeCheckWhat,
  changeGame,
  changeTotalProfit,
  changeNextProfit,
  changeTiles,
} = diceSlice.actions;
export default diceSlice.reducer;
