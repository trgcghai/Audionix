import { Option } from "@/components/ui/MultipleSelector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrackManagementState {
  current: number;
  limit: number;
  title: string;
  albums: Option[];
  genres: Option[];
  uploadTime: Date | undefined; // ISO date string or null
  status: Option[];
  debounceTitle: string;
}

const initialState: TrackManagementState = {
  current: 1,
  limit: 10,
  title: "",
  albums: [],
  genres: [],
  uploadTime: undefined,
  status: [],
  debounceTitle: "",
};

export const trackManagementSlice = createSlice({
  name: "trackManagement",
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
        albums?: Option[];
        uploadTime?: Date | undefined;
        status?: Option[];
        genres?: Option[];
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
} = trackManagementSlice.actions;

export default trackManagementSlice.reducer;
