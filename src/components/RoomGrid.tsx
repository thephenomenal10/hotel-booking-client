import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { RoomDispatch, RootState } from "../redux/store";
import { IRoom } from "../interfaces/IRoom";
import { resetError } from "../redux/slice/roomSlice";

const RoomGrid: React.FC = () => {
  const dispatch = useDispatch<RoomDispatch>();

  const { rooms, loading, error, errorHandled } = useSelector(
    (state: RootState) => state.rooms
  );

  useEffect(() => {
    console.log("useEffect triggered");
    if (error && !errorHandled) {
      toast.error(`Error: ${error}`, {
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      dispatch(resetError());
    }
  }, [error, errorHandled, dispatch]);

  if (loading) return <Typography>Loading rooms...</Typography>;

  const validRooms = Array.isArray(rooms) ? rooms : [];
  const roomsByFloor = validRooms.reduce(
    (acc: Record<number, IRoom[]>, room) => {
      acc[room.floor] = acc[room.floor] || [];
      acc[room.floor].push(room);
      return acc;
    },
    {}
  );

  const sortedFloors = Object.entries(roomsByFloor).sort(
    (a, b) => Number(b[0]) - Number(a[0])
  );

  return (
    <>
      <Grid
        container
        direction="row"
        spacing={0}
        style={{ marginTop: "16px", alignItems: "center" }}
      >
        <Grid item>
          <Box
            style={{
              width: "80px",
              backgroundColor: "#ccc",
              border: "1px solid black",
              height: `${sortedFloors.length * 64}px`,
            }}
          />
        </Grid>
        <Grid item style={{ flexGrow: 1, marginLeft: "20px" }}>
          <Grid container direction="column" spacing={2}>
            {sortedFloors.map(([floor, floorRooms]) => (
              <Grid item key={floor}>
                <Grid container spacing={1}>
                  {floorRooms.map((room: IRoom) => (
                    <Grid item xs={1} key={room.roomId}>
                      <Box
                        style={{
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            room.status === "booked" ? "red" : "green",
                          color: "white",
                          borderRadius: "4px",
                        }}
                      >
                        {room.roomNumber}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RoomGrid;
