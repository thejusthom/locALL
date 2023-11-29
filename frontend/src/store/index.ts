import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import eventsReducer from './slices/events-slice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        // user: userReducer
    }
})