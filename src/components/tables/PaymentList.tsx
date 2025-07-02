"use client";

import { useEffect, useState } from "react";

type Payment = {
    id: string;
    bookingId: string;
    amount: number;
    paymentMethod: string;
    paymentDate: string;
    status: string;
};

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/payments")
            .then((res) => res.json())
            .then((data) => {
                setPayments(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading payments:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>All Payments</h1>

            {loading ? (
                <p>Loading...</p>
            ) : payments.length === 0 ? (
                <p>No payments found.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Booking</th>
                        <th style={thStyle}>Amount</th>
                        <th style={thStyle}>Method</th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td style={tdStyle}>{payment.id}</td>
                            <td style={tdStyle}>{payment.bookingId}</td>
                            <td style={tdStyle}>${payment.amount.toFixed(2)}</td>
                            <td style={tdStyle}>{payment.paymentMethod}</td>
                            <td style={tdStyle}>{payment.paymentDate}</td>
                            <td style={tdStyle}>{payment.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const thStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "0.5rem",
    borderBottom: "2px solid #ccc",
};

const tdStyle: React.CSSProperties = {
    padding: "0.5rem",
    borderBottom: "1px solid #eee",
};
