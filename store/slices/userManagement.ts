import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserManagementState {
  current: number;
  limit: number;
  username: string;
  email: string;
  debounceUsername: string;
}

const initialState: UserManagementState = {
  current: 1,
  limit: 10,
  username: "",
  email: "",
  debounceUsername: "",
};

export const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    clearFilters: () => initialState,
    setDebounceUsername: (state, action: PayloadAction<string>) => {
      state.debounceUsername = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        username?: string;
        email?: string;
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
  setDebounceUsername,
  setFilters,
  setCurrentPage,
  setPageLimit,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;
