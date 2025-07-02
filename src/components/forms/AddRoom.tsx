"use client";

import { useEffect, useState } from "react";

export default function AddRoom() {
    const [roomNumber, setRoomNumber] = useState("");
    const [roomStatus, setRoomStatus] = useState("FREE");
    const [hotelId, setHotelId] = useState("");
    const [roomTypeId, setRoomTypeId] = useState("");
    const [hotels, setHotels] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [message, setMessage] = useState("");

    // Load hotel and room type options
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/hotels");
                const data = await res.json();
                setHotels(data);
            } catch (err) {
                console.error("Failed to fetch hotels:", err);
            }
        };

        const fetchRoomTypes = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/room-types");
                const data = await res.json();
                setRoomTypes(data);
            } catch (err) {
                console.error("Failed to fetch room types:", err);
            }
        };

        fetchHotels();
        fetchRoomTypes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const roomData = {
            roomNumber,
            roomStatus,
            hotelId,
            roomTypeId,
        };

        try {
            const res = await fetch("http://localhost:8080/api/rooms/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(roomData),
            });

            if (res.ok) {
                setMessage("Room saved successfully!");
                setRoomNumber("");
                setHotelId("");
                setRoomTypeId("");
            } else {
                setMessage("Failed to save room.");
            }
        } catch (err) {
            console.error(err);
            setMessage("Error occurred.");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Room</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block mb-1 font-semibold">Room Number:</label>
                    <input
                        type="text"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="block mb-1 font-semibold">Room Status:</label>
                    <select
                        value={roomStatus}
                        onChange={(e) => setRoomStatus(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    >
                        <option value="FREE">FREE</option>
                        <option value="BOOKED">BOOKED</option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="block mb-1 font-semibold">Hotel:</label>
                    <select
                        value={hotelId}
                        onChange={(e) => setHotelId(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    >
                        <option value="">Select Hotel</option>
                        {hotels.map((hotel: any) => (
                            <option key={hotel.id} value={hotel.id}>
                                {hotel.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Room Type:</label>
                    <select
                        value={roomTypeId}
                        onChange={(e) => setRoomTypeId(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    >
                        <option value="">Select Room Type</option>
                        {roomTypes.map((type: any) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Room
                </button>
            </form>

            {message && <p className="mt-4 text-green-600">{message}</p>}
        </div>
    );
}