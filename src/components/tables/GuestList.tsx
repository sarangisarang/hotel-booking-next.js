"use client";

import { useEffect, useState } from "react";

/**
 * Guest type definition for type safety and clarity.
 */
type Guest = {
    id: string | number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
};

/**
 * GuestList component
 * Fetches and displays a list of guests from your Spring Boot backend in a clean, responsive table.
 */
export default function GuestList() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches guest data from the backend API on component mount.
     */
    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/guests");
                if (!response.ok) {
                    throw new Error(`Failed to fetch guests: ${response.statusText}`);
                }
                const data = await response.json();

                console.log("Fetched guests:", data); // Debug API response shape

                /**
                 * If your backend response is nested, adjust here.
                 * For example, if the response is [{ guest: {...}, room: {...} }]
                 * you can map like:
                 * setGuests(data.map(item => item.guest));
                 */
                setGuests(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchGuests();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-blue-200">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-100 to-red-200">
                <p className="text-red-700 text-lg font-medium">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="pl-64 pr-4 w-full flex flex-col items-center justify-start min-h-screen overflow-x-auto">
            <h1 className="text-4xl font-extrabold text-blue-700 mb-8 drop-shadow">
                👥 Guest List
            </h1>
            <div className="w-full max-w-6xl overflow-x-auto backdrop-blur-sm bg-white/80 rounded-xl shadow-xl ring-1 ring-gray-300">
                <table className="min-w-full">
                    <thead className="bg-blue-600 bg-opacity-90">
                    <tr>
                        {["ID", "First Name", "Last Name", "Email", "Phone", "Address", "Birth Date"].map(
                            (header) => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap"
                                >
                                    {header}
                                </th>
                            )
                        )}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {guests.map((guest, idx) => (
                        <tr
                            key={guest.id ?? `guest-${idx}`} // Safe fallback if id is missing
                            className="hover:bg-blue-50 transition duration-200"
                        >
                            <td className="px-4 py-3 text-xs text-gray-700 break-all">{guest.id ?? "N/A"}</td>
                            <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{guest.firstName ?? "N/A"}</td>
                            <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{guest.lastName ?? "N/A"}</td>
                            <td className="px-4 py-3 text-gray-800">{guest.email ?? "N/A"}</td>
                            <td className="px-4 py-3 text-gray-800">{guest.phone ?? "N/A"}</td>
                            <td className="px-4 py-3 text-gray-800">{guest.address ?? "N/A"}</td>
                            <td className="px-4 py-3 text-gray-800 whitespace-nowrap">
                                {guest.birthDate
                                    ? new Date(guest.birthDate).toLocaleDateString()
                                    : "N/A"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

