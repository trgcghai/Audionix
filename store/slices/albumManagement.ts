import { Option } from "@/components/ui/MultipleSelector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlbumManagementState {
  current: number;
  limit: number;
  title: string;
  genres: Option[];
  uploadTime: Date | undefined;
  status: Option[];
  debounceTitle: string;
}

const initialState: AlbumManagementState = {
  current: 1,
  limit: 10,
  title: "",
  genres: [],
  uploadTime: undefined,
  status: [],
  debounceTitle: "",
};

export const albumManagementSlice = createSlice({
  name: "albumManagement",
  initialState,
  reducers: {
    clearFilters: () => initialState,
    setDebounceTitle: (state, action: PayloadAction<string>) => {
      state.debounceTitle = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        title?: string;
        genres?: Option[];
        uploadTime?: Date | undefined;
        status?: Option[];
      }>,
    ) => {
      state.title = action.payload.title || "";
      state.genres = action.payload.genres || [];
      state.uploadTime = action.payload.uploadTime || undefined;
      state.status = action.payload.status || [];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.current = action.payload < 1 ? 1 : action.payload;
    },
    setPageLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload < 1 ? 10 : action.payload;
    },
  },
});

export const {
  clearFilters,
  setDebounceTitle,
  setFilters,
  setCurrentPage,
  setPageLimit,
} = albumManagementSlice.actions;

export default albumManagementSlice.reducer;
