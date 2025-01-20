import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../interfaces/IRoom";
import {
  bookRooms,
  fetchRooms,
  randomOccupancy,
  resetRooms,
} from "../thunk/roomThunk";

interface RoomState {
  rooms: IRoom[];
  loading: boolean;
  error: string | null;
  errorHandled: boolean;
}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
  errorHandled: true,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
      state.errorHandled = true; // Reset error handling
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.rooms = action.payload.sort(
          (a: IRoom, b: IRoom) => a.roomNumber - b.roomNumber
        );
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch rooms";
      })
      .addCase(bookRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.rooms = action.payload.sort(
          (a: IRoom, b: IRoom) => a.roomNumber - b.roomNumber
        );
      })
      .addCase(bookRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to book rooms";
        state.errorHandled = false;
      })
      .addCase(randomOccupancy.pending, (state) => {
        state.loading = true;
      })
      .addCase(randomOccupancy.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.rooms = action.payload.sort(
          (a: IRoom, b: IRoom) => a.roomNumber - b.roomNumber
        );
      })
      .addCase(randomOccupancy.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to perform Random Occupancy";
      })
      .addCase(resetRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.rooms = action.payload.sort(
          (a: IRoom, b: IRoom) => a.roomNumber - b.roomNumber
        );
      })
      .addCase(resetRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to reset rooms booking";
      });
  },
});

export const { resetError } = roomSlice.actions;
export default roomSlice.reducer;
