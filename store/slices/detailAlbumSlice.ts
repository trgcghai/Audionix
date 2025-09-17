import { Album } from "@/app/types/model";
import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetailAlbumSliceState {
  isOpen: boolean;
  album: Album | null;
}

const initialState: DetailAlbumSliceState = {
  isOpen: false,
  album: null,
};

export const detailAlbumSlice = createSlice({
  name: "detailAlbum",
  initialState,
  reducers: {
    openViewDetail: (state, action: PayloadAction<{ album: Album }>) => {
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
    setAlbum: (state, action: PayloadAction<{ album: Album }>) => {
      state.album = action.payload.album;
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
  setAlbum,
  setOpen,
} = detailAlbumSlice.actions;

export const useDetailAlbumSlice = () =>
  useAppSelector((state) => state.detailAlbum);

export default detailAlbumSlice.reducer;
