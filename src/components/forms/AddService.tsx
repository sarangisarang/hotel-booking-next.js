"use client";

import { useState } from "react";
import axios from "axios";

export default function AddService() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const service = {
                name,
                description,
                price,
            };
            await axios.post("http://localhost:8080/api/services", service);
            setMessage("Service added successfully!");
            setName("");
            setDescription("");
            setPrice(0);
        } catch (error) {
            console.error("Failed to add service:", error);
            setMessage("Error adding service.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
            <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
            {message && (
                <div className="mb-4 text-sm text-green-600 font-semibold">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Price (€)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        className="w-full border p-2 rounded"
                        step="0.01"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Service
                </button>
            </form>
        </div>
    );
}
