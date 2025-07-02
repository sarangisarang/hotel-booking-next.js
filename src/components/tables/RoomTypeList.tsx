"use client";

import React, { useEffect, useState } from "react";

export default function RoomTypeList() {
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRoomTypes = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/room-types", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });
            if (!response.ok) throw new Error("Fetch failed");
            const data = await response.json();
            setRoomTypes(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch room types.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoomTypes();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this room type?")) return;
        try {
            const response = await fetch(`http://localhost:8080/api/room-types/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchRoomTypes();
            } else {
                setError("Failed to delete room type.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to delete room type.");
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Room Types</h1>

            {error && <div className="text-red-500 mb-2">{error}</div>}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Price/Night</th>
                            <th className="p-2 border">Capacity</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {roomTypes.map((type: any) => (
                            <tr key={type.id} className="hover:bg-gray-50">
                                <td className="p-2 border text-xs">{type.id}</td>
                                <td className="p-2 border">{type.name}</td>
                                <td className="p-2 border">{type.description}</td>
                                <td className="p-2 border text-center">{type.pricePerNight}</td>
                                <td className="p-2 border text-center">{type.capacity}</td>
                                <td className="p-2 border text-center">
                                    <button
                                        onClick={() => handleDelete(type.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
