"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Guest = {
    id: string;
    firstName: string;
    lastName: string;
};

type Service = {
    id: string;
    name: string;
};

export default function AddServiceRequestPage() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [guestId, setGuestId] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [status, setStatus] = useState("PENDING");

    const router = useRouter();

    // Load guests and services
    useEffect(() => {
        fetch("http://localhost:8080/api/guests")
            .then((res) => res.json())
            .then(setGuests)
            .catch(console.error);

        fetch("http://localhost:8080/api/services")
            .then((res) => res.json())
            .then(setServices)
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { guestId, serviceId, status };

        const res = await fetch("http://localhost:8080/api/servicerequests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            alert("Service Request Added!");
            router.push("/service-requests");
        } else {
            alert("Something went wrong.");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Add Service Request</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <label>Guest:</label>
                    <select
                        value={guestId}
                        onChange={(e) => setGuestId(e.target.value)}
                        required
                    >
                        <option value="">Select Guest</option>
                        {guests.map((guest) => (
                            <option key={guest.id} value={guest.id}>
                                {guest.firstName} {guest.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label>Service:</label>
                    <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        required
                    >
                        <option value="">Select Service</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
                <button type="submit">Add Request</button>
            </form>
        </div>
    );
}
