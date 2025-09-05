import { User } from "@/app/types/model";
import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
  user: User | null;
  roles: string[];
  isAuthenticated: boolean;
}

const initialState: UserSliceState = {
  user: null,
  roles: [],
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<Partial<{ user: User; roles: string[] }>>,
    ) => {
      const { user, roles } = action.payload;
      if (user) {
        state.user = user;
      }
      if (roles) {
        state.roles = roles;
      }
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.roles = [];
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.user = null;
        state.roles = [];
      }
    },
    setRoles: (state, action: PayloadAction<string[]>) => {
      state.roles = action.payload;
    },
  },
});

export const { setUser, clearUser, setIsAuthenticated, setRoles } =
  userSlice.actions;

export const useUserSlice = () => useAppSelector((state) => state.user);

export default userSlice.reducer;
