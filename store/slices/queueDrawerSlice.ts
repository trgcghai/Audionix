import { useAppSelector } from "@/hooks/redux";
import { createSlice } from "@reduxjs/toolkit";

interface QueueDrawerState {
  isOpen: boolean;
}

const initialState: QueueDrawerState = {
  isOpen: false,
};

export const queueDrawerSlice = createSlice({
  name: "queueDrawer",
  initialState,
  reducers: {
    openQueueDrawer: (state) => {
      state.isOpen = true;
    },
    closeQueueDrawer: (state) => {
      state.isOpen = false;
    },
    toggleQueueDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openQueueDrawer, closeQueueDrawer, toggleQueueDrawer } =
  queueDrawerSlice.actions;

export const useQueueDrawer = () =>
  useAppSelector((state) => state.queueDrawer);

export default queueDrawerSlice.reducer;
