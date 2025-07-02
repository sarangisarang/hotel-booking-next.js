"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaStar, FaMapMarkerAlt, FaPen, FaBuilding, FaTrash } from "react-icons/fa";

interface Hotel {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    rating: number;
}

export default function HotelList() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8080/api/hotels");
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/hotels/${id}`);
            setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
        } catch (error) {
            console.error("Error deleting hotel:", error);
        }
    };

    return (
        <div className="pl-64 pr-4 w-full flex flex-col items-center justify-start min-h-screen overflow-x-auto">
            <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2 mb-2">
                🏨 Hotel List
            </h1>
            <p className="text-center text-gray-600 mb-4 text-sm">
                Search, view, and manage hotels from the Spring Boot API.
            </p>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">🏨 Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">📍 Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">📞 Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">✉️ Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">✏️ Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">⭐ Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">🗑️ Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {hotels.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="text-center py-4 text-gray-500">No hotels found.</td>
                    </tr>
                ) : (
                    hotels.map((hotel) => (
                        <tr key={hotel.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.rating}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <button
                                    onClick={() => handleDelete(hotel.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}


