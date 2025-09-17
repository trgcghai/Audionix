import { Track } from "@/app/types/model";
import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailTrackSliceState {
  isOpen: boolean;
  track: Track | null;
}

const initialState: DetailTrackSliceState = {
  isOpen: false,
  track: null,
};

export const detailTrackSlice = createSlice({
  name: "detailTrack",
  initialState,
  reducers: {
    openViewDetail: (state, action: PayloadAction<{ track: Track }>) => {
      state.isOpen = true;
      state.track = action.payload.track;
    },
    hideViewDetail: (state) => {
      state.isOpen = false;
      state.track = null;
    },
    toggleViewDetail: (state, action) => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) {
        state.track = action.payload.track;
      } else {
        state.track = null;
      }
    },
    setTrack: (state, action: PayloadAction<{ track: Track }>) => {
      state.track = action.payload.track;
    },
    setOpen: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const {
  openViewDetail,
  hideViewDetail,
  toggleViewDetail,
  setTrack,
  setOpen,
} = detailTrackSlice.actions;

export const useDetailTrackSlice = () =>
  useAppSelector((state) => state.detailTrack);

export default detailTrackSlice.reducer;
