import { useAppSelector } from "@/hooks/redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
  email: string;
  roles: string[];
  isAuthenticated: boolean;
  username: string;
  avatar:
    | [
        {
          url: string;
          width: number;
          height: number;
          key: string;
        },
      ]
    | null;
}

const initialState: UserSliceState = {
  email: "",
  roles: [],
  isAuthenticated: false,
  username: "",
  avatar: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<
        Partial<{
          email: string;
          roles: string[];
          username: string;
          avatar?: [
            {
              url: string;
              width: number;
              height: number;
              key: string;
            },
          ];
        }>
      >,
    ) => {
      const { email, roles, username, avatar } = action.payload;
      if (email) state.email = email;
      if (roles) state.roles = roles;
      if (username) state.username = username;
      state.isAuthenticated = true;
      if (avatar) {
        state.avatar = avatar;
      }
    },
    clearUser: (state) => {
      state.email = "";
      state.roles = [];
      state.username = "";
      state.isAuthenticated = false;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, clearUser, setIsAuthenticated } = userSlice.actions;

export const useUserSlice = () => useAppSelector((state) => state.user);

export default userSlice.reducer;
