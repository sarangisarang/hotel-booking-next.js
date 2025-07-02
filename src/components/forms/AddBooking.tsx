
'use client';
import { useState, useEffect } from 'react';

interface Guest {
    id: string;
    firstName: string;
    lastName: string;
}

interface RoomType {
    name: string;
}

interface Room {
    id: string;
    roomNumber: string;
    roomType?: RoomType;
}

export default function BookingForm() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [formData, setFormData] = useState({
        guestId: '',
        roomId: '',
        checkInDate: '',
        checkOutDate: '',
        status: 'PENDING',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/guests')
            .then((res) => res.json())
            .then((data) => setGuests(data))
            .catch((err) => console.error('Error fetching guests:', err));

        fetch('http://localhost:8080/api/rooms')
            .then((res) => res.json())
            .then((data) => setRooms(data))
            .catch((err) => console.error('Error fetching rooms:', err));
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('✅ Booking created successfully');
                setFormData({
                    guestId: '',
                    roomId: '',
                    checkInDate: '',
                    checkOutDate: '',
                    status: 'PENDING',
                });
            } else {
                const errorText = await res.text();
                setError(errorText || 'Unknown error occurred');
            }
        } catch (err) {
            console.error('❌ Error creating booking:', err);
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
            {error && <p className="text-red-600">{error}</p>}

            <label className="block">
                Guest:
                <select
                    name="guestId"
                    value={formData.guestId}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Guest</option>
                    {guests.map((guest) => (
                        <option key={guest.id} value={guest.id}>
                            {guest.firstName} {guest.lastName}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block">
                Room:
                <select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.roomNumber} - {room.roomType?.name}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block">
                Check-in Date:
                <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block">
                Check-out Date:
                <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
            </label>

            <label className="block">
                Status:
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </label>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Submitting...' : 'Create Booking'}
            </button>
        </form>
    );
}
