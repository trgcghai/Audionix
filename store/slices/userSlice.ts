import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
  email: string;
  roles: string[];
  isAuthenticated: boolean;
  username: string;
}

const initialState: UserSliceState = {
  email: "",
  roles: [],
  isAuthenticated: false,
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        email: string;
        roles: string[];
        username: string;
      }>,
    ) => {
      const { email, roles, username } = action.payload;
      state.email = email;
      state.roles = roles;
      state.username = username;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.email = "";
      state.roles = [];
      state.username = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const useUserSlice = () => useAppSelector((state) => state.user);

export default userSlice.reducer;
