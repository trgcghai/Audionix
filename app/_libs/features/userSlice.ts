import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSliceInitialState {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const initialState: UserSliceInitialState = {
  id: "",
  name: "",
  email: "",
  role: "user",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSliceInitialState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: { user: UserSliceInitialState }) =>
  state.user;

export default userSlice.reducer;
