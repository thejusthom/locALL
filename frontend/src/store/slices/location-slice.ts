import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILocation } from "../../models/location";


export type LocationState = ILocation[];

const initialState: LocationState = [];

const locationSlice = createSlice({
    name: 'events',
    initialState: initialState,
    reducers: {
        saveLocation: (state, action: PayloadAction<LocationState>) => {
            return action.payload;
        }
    }
});

export const { saveLocation } = locationSlice.actions;

export default locationSlice.reducer;