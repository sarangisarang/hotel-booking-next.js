"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardData {
    totalGuests: number;
    totalRooms: number;
    totalBookings: number;
    totalRevenue: number;
    availableRooms: number;
    occupiedRooms: number;
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/dashboard");
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard / Analytics</h1>

            {loading ? (
                <p>Loading dashboard data...</p>
            ) : !data ? (
                <p>Failed to load dashboard data.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Total Guests</h2>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{data.totalGuests}</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Total Rooms</h2>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{data.totalRooms}</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Total Bookings</h2>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{data.totalBookings}</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            ${data.totalRevenue.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded shadow text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Available Rooms</h2>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{data.availableRooms}</p>
                    </div>

                    <div className="bg-white p-4 rounded shadow text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Occupied Rooms</h2>
                        <p className="text-3xl font-bold text-red-600 mt-2">{data.occupiedRooms}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
