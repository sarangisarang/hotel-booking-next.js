'use client';
import { useEffect, useState } from 'react';

export interface Booking {
    id: string;
    guestId: string;
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    paymentStatus: string;
    totalAmount: number;
}

interface Guest {
    id: string;
    firstName: string;
    lastName: string;
}

interface Room {
    id: string;
    roomNumber: string;
}

export default function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        // Fetch bookings
        fetch('http://localhost:8080/api/bookings')
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.error('Error fetching bookings:', err));

        // Fetch guests
        fetch('http://localhost:8080/api/guests')
            .then(res => res.json())
            .then(data => setGuests(data))
            .catch(err => console.error('Error fetching guests:', err));

        // Fetch rooms
        fetch('http://localhost:8080/api/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.error('Error fetching rooms:', err));
    }, []);

    const getGuestName = (id: string) => {
        const guest = guests.find(g => g.id === id);
        return guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest';
    };

    const getRoomNumber = (id: string) => {
        const room = rooms.find(r => r.id === id);
        return room ? `Room ${room.roomNumber}` : 'Unknown Room';
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">📋 Booking List</h1>
            <table className="w-full border border-gray-300 table-auto">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2 text-left">Guest</th>
                    <th className="border px-4 py-2 text-left">Room</th>
                    <th className="border px-4 py-2 text-left">Check-In</th>
                    <th className="border px-4 py-2 text-left">Check-Out</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                    <th className="border px-4 py-2 text-left">Amount</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{getGuestName(b.guestId)}</td>
                        <td className="border px-4 py-2">{getRoomNumber(b.roomId)}</td>
                        <td className="border px-4 py-2">{b.checkInDate}</td>
                        <td className="border px-4 py-2">{b.checkOutDate}</td>
                        <td className="border px-4 py-2">{b.paymentStatus}</td>
                        <td className="border px-4 py-2">{b.totalAmount.toFixed(2)} €</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

