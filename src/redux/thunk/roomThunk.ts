import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../service/apiService";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await apiService.get("/rooms");
  try {
    if (!Array.isArray(response.data?.data)) {
      throw new Error("Invalid data format: Expected an array");
    }
    return response.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
});

export const bookRooms = createAsyncThunk(
  "rooms/bookRooms",
  async (roomsCount: number) => {
    try {
      const response = await apiService.post("/rooms/booking", { roomsCount });
      return response.data?.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message);
    }
  }
);

export const randomOccupancy = createAsyncThunk(
  "rooms/randomOccupancy",
  async () => {
    try {
      const response = await apiService.post("/rooms/random-occupancy");
      return response.data?.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message);
    }
  }
);

export const resetRooms = createAsyncThunk("rooms/resetRooms", async () => {
  try {
    const response = await apiService.post("/rooms/reset");
    return response.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
});
