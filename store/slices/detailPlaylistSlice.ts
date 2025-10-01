import { Playlist } from "@/app/types/model";
import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailPlaylistSliceState {
  isOpen: boolean;
  playlist: Playlist | null;
}

const initialState: DetailPlaylistSliceState = {
  isOpen: false,
  playlist: null,
};

export const detailPlaylistSlice = createSlice({
  name: "detailPlaylist",
  initialState,
  reducers: {
    openViewDetail: (state, action: PayloadAction<{ playlist: Playlist }>) => {
      state.isOpen = true;
      state.playlist = action.payload.playlist;
    },
    hideViewDetail: (state) => {
      state.isOpen = false;
      state.playlist = null;
    },
    toggleViewDetail: (state, action) => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) {
        state.playlist = action.payload.playlist;
      } else {
        state.playlist = null;
      }
    },
    setPlaylist: (state, action: PayloadAction<{ playlist: Playlist }>) => {
      state.playlist = action.payload.playlist;
    },
    setOpen: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen;
      if (!state.isOpen) state.playlist = null;
    },
  },
});

export const {
  openViewDetail,
  hideViewDetail,
  toggleViewDetail,
  setPlaylist,
  setOpen,
} = detailPlaylistSlice.actions;

export const useDetailPlaylistSlice = () =>
  useAppSelector((state) => state.detailPlaylist);

export default detailPlaylistSlice.reducer;
