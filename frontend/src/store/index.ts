import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/events-slice';
import locationReducer from './slices/location-slice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        location: locationReducer
        // user: userReducer
    }
})
