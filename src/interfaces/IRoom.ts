export interface IRoom {
  roomId: string;
  floor: number;
  roomNumber: number;
  status: string; // "booked" or "available"
}
