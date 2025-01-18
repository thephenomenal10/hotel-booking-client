import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Stack, TextField } from "@mui/material";
import {
  bookRooms,
  randomOccupancy,
  resetRooms,
} from "../redux/thunk/roomThunk";
import { RoomDispatch } from "../redux/store";

const Controls: React.FC = () => {
  const [roomCount, setRoomCount] = useState<number>(1);
  const dispatch = useDispatch<RoomDispatch>();

  const handleBooking = () => {
    if (roomCount > 0 && roomCount <= 5) {
      dispatch(bookRooms(roomCount));
    } else {
      alert("You can book between 1 and 5 rooms only.");
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      style={{ marginTop: "16px", marginLeft: "100px" }}
    >
      <TextField
        sx={{ width: 100 }}
        type="number"
        label="Rooms"
        value={roomCount}
        onChange={(e) => setRoomCount(Number(e.target.value))}
        inputProps={{ min: 1, max: 5 }}
        variant="outlined"
      />
      <Button variant="contained" onClick={handleBooking}>
        Book Rooms
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(resetRooms() as any)}
      >
        Reset
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch(randomOccupancy() as any)}
      >
        Random
      </Button>
    </Stack>
  );
};

export default Controls;
