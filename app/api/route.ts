import { NextResponse } from "next/server";
let id = 0;

let activeRooms: { [roomID: string]: { id: number; bool: boolean } } = {};

export function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const roomID = searchParams.get("roomID");

    if (roomID) {
        if (activeRooms[roomID]) {
            return NextResponse.json({ ...activeRooms[roomID], roomID,id:++id});
        } else {
            return NextResponse.json({ error: "Invalid room ID" });
        }
    } else {
        // Create new room if no roomID is provided
        ++id;
        const bool = id % 2 === 0 ? false : true;
        const newRoomID = Math.floor(Math.random() * 10000).toString();

        activeRooms[newRoomID] = { id, bool };
        return NextResponse.json({ id, bool, roomID: newRoomID });
    }
}
