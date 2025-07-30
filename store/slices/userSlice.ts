import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSliceState {
  email: string;
  role: string[];
  isAuthenticated: boolean;
  username: string;
}

const initialState: UserSliceState = {
  email: "",
  role: [],
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
        role: string[];
        username: string;
      }>,
    ) => {
      const { email, role, username } = action.payload;
      state.email = email;
      state.role = role;
      state.username = username;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.email = "";
      state.role = [];
      state.username = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
