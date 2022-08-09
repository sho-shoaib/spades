import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betting: false,
  betAmt: 100,
  rotateWheel: false,
  pinLandsOn: 0,
};

const wheelSlice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    changeBetAmt: (state, { payload }) => {
      state.betAmt = payload.betAmt;
    },
    changeBetting: (state, { payload }) => {
      state.betting = payload.betting;
    },
    changeRotate: (state, { payload }) => {
      state.rotateWheel = payload.rotate;
    },
    changePinLandsOn: (state) => {
      state.pinLandsOn =
        Math.floor(Math.random() * (360 - 0 + 1) + 0) * (Math.PI / 180);
    },
  },
});

export const { changeBetAmt, changeBetting, changeRotate, changePinLandsOn } =
  wheelSlice.actions;
export default wheelSlice.reducer;
