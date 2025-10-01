import { Option } from "@/components/ui/MultipleSelector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaylistManagement {
  current: number;
  limit: number;
  title: string;
  owners: Option[];
  debounceTitle: string;
}

const initialState: PlaylistManagement = {
  current: 1,
  limit: 10,
  title: "",
  owners: [],
  debounceTitle: "",
};

export const playlistManagementSlice = createSlice({
  name: "playlistManagement",
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
        owners?: Option[];
      }>,
    ) => {
      return { ...state, ...action.payload, current: 1 };
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
} = playlistManagementSlice.actions;

export default playlistManagementSlice.reducer;
