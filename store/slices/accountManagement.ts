import { Option } from "@/components/ui/MultipleSelector";
import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountManagementState {
  current: number;
  limit: number;
  email: string;
  debounceEmail: string;
  roles: Option[];
}

const initialState: AccountManagementState = {
  current: 1,
  limit: 10,
  email: "",
  debounceEmail: "",
  roles: [],
};

export const accountManagementSlice = createSlice({
  name: "accountManagement",
  initialState,
  reducers: {
    clearFilters: () => initialState,
    setDebounceEmail: (state, action: PayloadAction<string>) => {
      state.debounceEmail = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<{
        email?: string;
        roles?: Option[];
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
  setDebounceEmail,
  setFilters,
  setCurrentPage,
  setPageLimit,
} = accountManagementSlice.actions;

export const useAccountManagementSlice = () =>
  useAppSelector((state) => state.accountManagement);

export default accountManagementSlice.reducer;
