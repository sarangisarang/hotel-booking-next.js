"use client";

import React, { useState } from "react";

/**
 * AddHotelPage component for adding hotels via a form.
 * Fully aligned with the Hotel Entity on your Spring Boot backend.
 */
export default function AddHotelPage() {
    // State for form fields
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        description: "",
        rating: "",
    });

    // State for loading and success/error messages
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    /**
     * Handle input changes and update form data
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    /**
     * Handle form submission to send POST request to Spring Boot backend
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // Convert rating to number if present
            const payload = {
                ...formData,
                rating: formData.rating ? parseFloat(formData.rating) : null,
            };

            const response = await fetch("http://localhost:8080/api/hotels/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`✅ Hotel "${data.name}" added successfully!`);

                // Clear form fields
                setFormData({
                    name: "",
                    address: "",
                    phone: "",
                    email: "",
                    description: "",
                    rating: "",
                });
            } else {
                const errorText = await response.text();
                setMessage(`❌ Failed to add hotel. Server says: ${errorText}`);
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ An error occurred while adding the hotel.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pl-64 pr-4 w-full flex flex-col items-center justify-start min-h-screen overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Hotel</h1>

            {message && (
                <div className="mb-4 text-center text-sm text-blue-600">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Hotel Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="number"
                    step="0.1"
                    name="rating"
                    placeholder="Rating (e.g., 4.5)"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 transition"}`}
                >
                    {loading ? "Adding..." : "Add Hotel"}
                </button>
            </form>
        </div>
    );
}