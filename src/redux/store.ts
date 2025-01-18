// frontend/src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./slice/roomSlice";

export const store = configureStore({
  reducer: {
    rooms: roomReducer,
  },
});

// RootState and RoomDispatch for type safety
export type RootState = ReturnType<typeof store.getState>;
export type RoomDispatch = typeof store.dispatch;
