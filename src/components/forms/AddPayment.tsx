"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Booking = {
    id: string;
    code?: string; // optional field to show user
};

export default function AddPaymentPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [bookingId, setBookingId] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CARD");
    const [paymentDate, setPaymentDate] = useState("");
    const [status, setStatus] = useState("PENDING");

    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8080/api/bookings")
            .then((res) => res.json())
            .then(setBookings)
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            bookingId,
            amount: parseFloat(amount),
            paymentMethod,
            paymentDate,
            status,
        };

        const res = await fetch("http://localhost:8080/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            alert("Payment added!");
            router.push("/payments");
        } else {
            alert("Something went wrong.");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Add Payment</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Booking:</label>
                    <select value={bookingId} onChange={(e) => setBookingId(e.target.value)} required>
                        <option value="">Select Booking</option>
                        {bookings.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.code || b.id}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="0.01"
                        step="0.01"
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label>Payment Method:</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                        <option value="CARD">Card</option>
                        <option value="CASH">Cash</option>
                        <option value="ONLINE">Online</option>
                    </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label>Payment Date:</label>
                    <input
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>

                <button type="submit">Submit Payment</button>
            </form>
        </div>
    );
}