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
  },
});

export const { changeBetAmt } = wheelSlice.actions;
export default wheelSlice.reducer;
