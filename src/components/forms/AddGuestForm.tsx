"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Guest type definition
 */
type Guest = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
};

/**
 * AddGuestForm component for adding a new guest in the system
 * Displays a modern, clean, and colorful form using Tailwind styling
 */
export default function AddGuestForm() {
    const router = useRouter();

    // State for guest data
    const [guest, setGuest] = useState<Guest>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        birthDate: "",
    });

    // Feedback states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    /**
     * Handles changes in input fields
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGuest((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Handles form submission
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:8080/api/guests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(guest),
            });

            if (!response.ok) {
                throw new Error("Failed to add guest. Please try again.");
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/guests");
            }, 1500);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-center">
            <div className="form-card">
                <h1 className="form-heading">✨ Add New Guest</h1>
                <p className="form-subheading">Please fill in the guest details below.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={guest.firstName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={guest.lastName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={guest.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={guest.phone}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={guest.address}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="date"
                        name="birthDate"
                        value={guest.birthDate}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />

                    <button
                        type="submit"
                        className="form-button"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Guest"}
                    </button>

                    {error && <p className="feedback-error">{error}</p>}
                    {success && <p className="feedback-success">✅ Guest added successfully!</p>}
                </form>
            </div>
        </div>
    );
}
