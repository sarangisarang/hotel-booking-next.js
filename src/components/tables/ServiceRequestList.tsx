"use client";

import { useEffect, useState } from "react";

type ServiceRequest = {
    id: string;
    guestId: string;
    serviceId: string;
    status: string;
    requestDate: string;
};

export default function ServiceRequestsPage() {
    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/servicerequests")
            .then((res) => res.json())
            .then((data) => {
                setRequests(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading service requests:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Service Requests</h1>

            {loading ? (
                <p>Loading...</p>
            ) : requests.length === 0 ? (
                <p>No service requests found.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Guest ID</th>
                        <th style={thStyle}>Service ID</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Request Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((req) => (
                        <tr key={req.id}>
                            <td style={tdStyle}>{req.id}</td>
                            <td style={tdStyle}>{req.guestId}</td>
                            <td style={tdStyle}>{req.serviceId}</td>
                            <td style={tdStyle}>{req.status}</td>
                            <td style={tdStyle}>{new Date(req.requestDate).toLocaleString()}</td>
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
    borderBottom: "2px solid #ccc",
    padding: "0.5rem",
};

const tdStyle: React.CSSProperties = {
    padding: "0.5rem",
    borderBottom: "1px solid #eee",
};
