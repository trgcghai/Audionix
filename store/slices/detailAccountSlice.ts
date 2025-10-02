import { Account } from "@/app/types/model";
import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailAccountSliceState {
  isOpen: boolean;
  account: Account | null;
}

const initialState: DetailAccountSliceState = {
  isOpen: false,
  account: null,
};

export const detailAccountSlice = createSlice({
  name: "detailAccount",
  initialState,
  reducers: {
    openViewDetail: (state, action: PayloadAction<{ account: Account }>) => {
      state.isOpen = true;
      state.account = action.payload.account;
    },
    hideViewDetail: (state) => {
      state.isOpen = false;
      state.account = null;
    },
    toggleViewDetail: (state, action) => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) {
        state.account = action.payload.account;
      } else {
        state.account = null;
      }
    },
    setAccount: (state, action: PayloadAction<{ account: Account }>) => {
      state.account = action.payload.account;
    },
    setOpen: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen;
      if (!state.isOpen) state.account = null;
    },
  },
});

export const {
  openViewDetail,
  hideViewDetail,
  toggleViewDetail,
  setAccount,
  setOpen,
} = detailAccountSlice.actions;

export const useDetailAccountSlice = () =>
  useAppSelector((state) => state.detailAccount);

export default detailAccountSlice.reducer;
