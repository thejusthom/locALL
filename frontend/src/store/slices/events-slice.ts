import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IEvent } from "../../models/events";


export type EventsState = IEvent[];

const initialState: EventsState = [];

const eventsSlice = createSlice({
    name: 'events',
    initialState: initialState,
    reducers: {
        loadCourses: (state, action: PayloadAction<EventsState>) => {
            return action.payload;
        }
    }

});

export const { loadCourses } = eventsSlice.actions;

export default eventsSlice.reducer;