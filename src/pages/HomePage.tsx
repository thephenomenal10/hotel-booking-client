import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import RoomGrid from "../components/RoomGrid";
import Controls from "../components/Control";
import { fetchRooms } from "../redux/thunk/roomThunk";
import { RoomDispatch } from "../redux/store";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<RoomDispatch>();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <div>
      <h1>Hotel Booking System</h1>
      <Controls />
      <RoomGrid />
    </div>
  );
};

export default HomePage;
