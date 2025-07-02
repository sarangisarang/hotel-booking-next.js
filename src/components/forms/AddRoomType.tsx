'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRoomTypePage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerNight, setPricePerNight] = useState('');
    const [capacity, setCapacity] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('http://localhost:8080/api/room-types/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                description,
                pricePerNight: parseFloat(pricePerNight),
                capacity: parseInt(capacity)
            }),
        });

        if (res.ok) {
            router.push('/room-types');
        } else {
            alert('Failed to add room type');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Room Type</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="border rounded w-full p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Price per Night (₾)</label>
                    <input
                        type="number"
                        value={pricePerNight}
                        onChange={e => setPricePerNight(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Capacity</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={e => setCapacity(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Room Type
                </button>
            </form>
        </div>
    );
}
