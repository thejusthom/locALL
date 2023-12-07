import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPerson, IUser } from "../../models/user";

export type UserState = IUser;

const initialState: UserState = {
  person: {} as IPerson,
  username: '',
  password: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
      saveUser: (state, action: PayloadAction<UserState>) => {
        return action.payload;
      }
    }
});

export const { saveUser } = userSlice.actions;

export default userSlice.reducer;