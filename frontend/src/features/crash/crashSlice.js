import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betsArr: [],
  wantToBet: false,
  betAmt: 1,
  gameRunning: false,
  canBet: false,
  betting: false,
  crashed: false,
  crashAtText: "1",
  crashAtNo: 1,
  cashedOut: false,
  gameEnd: false,
};

const crashSlice = createSlice({
  name: "crash",
  initialState,
  reducers: {
    updateBetsArr: (state, { payload }) => {
      state.betsArr = payload.betsArr;
    },
    changeBetAmt: (state, { payload }) => {
      state.betAmt = payload.betAmt;
    },
    changeGameRunning: (state, { payload }) => {
      state.gameRunning = payload.gameRunning;
    },
    changeCanBet: (state, { payload }) => {
      state.canBet = payload.canBet;
    },
    changeBetting: (state, { payload }) => {
      state.betting = payload.betting;
    },
    changeCrashed: (state, { payload }) => {
      state.crashed = payload.crashed;
    },
    changeCrashAtText: (state, { payload }) => {
      state.crashAtText = payload.crashAtText;
    },
    changeCrashAtNo: (state, { payload }) => {
      state.crashAtNo = payload.crashAtNo;
    },
    changeCashedOut: (state, { payload }) => {
      state.cashedOut = payload.cashedOut;
    },
    changeGameEnd: (state, { payload }) => {
      state.gameEnd = payload.gameEnd;
    },
  },
});

export const {
  updateBetsArr,
  changeBetAmt,
  changeGameRunning,
  changeCanBet,
  changeBetting,
  changeCrashed,
  changeCrashAtText,
  changeCrashAtNo,
  changeCashedOut,
  changeGameEnd,
} = crashSlice.actions;
export default crashSlice.reducer;
