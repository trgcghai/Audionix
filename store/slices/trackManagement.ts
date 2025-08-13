import { Option } from "@/components/ui/MultipleSelector";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrackManagementState {
  current: number;
  limit: number;
  title: string;
  albums: Option[];
  uploadTime: Date | undefined; // ISO date string or null
  status: Option[];
  debounceTitle: string;
}

const initialState: TrackManagementState = {
  current: 1,
  limit: 10,
  title: "",
  albums: [],
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
      }>,
    ) => {
      state.title = action.payload.title || "";
      state.albums = action.payload.albums || [];
      state.uploadTime = action.payload.uploadTime || undefined;
      state.status = action.payload.status || [];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    setPageLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
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
