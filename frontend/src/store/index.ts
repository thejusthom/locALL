import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/events-slice';
import locationReducer from './slices/location-slice';
import userReducer from './slices/user-slice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        location: locationReducer,
        user: userReducer
    }
})
