"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Room {
    id: number;
    roomNumber: string;
    floor: string;
    roomTypeId: string;
    price: number;
    status: string;
    description: string;
}

export default function RoomListPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/rooms");
                setRooms(response.data);
            } catch (error) {
                console.error("Failed to fetch rooms", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Room List</h1>
            {loading ? (
                <p>Loading rooms...</p>
            ) : rooms.length === 0 ? (
                <p>No rooms found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border bg-white rounded shadow">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Room Number</th>
                            <th className="p-2 border">Floor</th>
                            <th className="p-2 border">Room Type ID</th>
                            <th className="p-2 border">Price</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-100">
                                <td className="p-2 border text-center">{room.id}</td>
                                <td className="p-2 border">{room.roomNumber}</td>
                                <td className="p-2 border">{room.floor}</td>
                                <td className="p-2 border">{room.roomTypeId}</td>
                                <td className="p-2 border">{room.status}</td>
                                <td className="p-2 border">{room.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
