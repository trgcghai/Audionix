import { ArtistAlbumItem } from "@/app/types/component";
import { createSlice } from "@reduxjs/toolkit";

interface DetailAlbumSliceState {
  isOpen: boolean;
  album: ArtistAlbumItem | null;
}

const initialState: DetailAlbumSliceState = {
  isOpen: false,
  album: null,
};

export const detailAlbumSlice = createSlice({
  name: "detailAlbum",
  initialState,
  reducers: {
    openViewDetail: (state, action) => {
      state.isOpen = true;
      state.album = action.payload.album;
    },
    hideViewDetail: (state) => {
      state.isOpen = false;
      state.album = null;
    },
    toggleViewDetail: (state, action) => {
      state.isOpen = !state.isOpen;
      if (state.isOpen) {
        state.album = action.payload.album;
      } else {
        state.album = null;
      }
    },
  },
});

export const { openViewDetail, hideViewDetail, toggleViewDetail } =
  detailAlbumSlice.actions;

export default detailAlbumSlice.reducer;
