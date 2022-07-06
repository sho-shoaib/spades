import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betting: false,
  betAmt: 100,
};

const wheelSlice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    changeBetAmt: (state, { payload }) => {
      state.betAmt = payload.betAmt;
    },
    chnageBetting: (state, { payload }) => {
      state.betting = payload.betting;
    },
  },
});

export const { changeBetAmt, changeBetting } = wheelSlice.actions;
export default wheelSlice.reducer;
