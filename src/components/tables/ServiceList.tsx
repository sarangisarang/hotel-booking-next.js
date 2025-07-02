"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
}

export default function ServiceListPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/services");
                setServices(response.data);
            } catch (error) {
                console.error("Failed to fetch services", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Service List</h1>
            {loading ? (
                <p>Loading services...</p>
            ) : services.length === 0 ? (
                <p>No services found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border bg-white rounded shadow">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-100">
                                <td className="p-2 border text-center">{service.id}</td>
                                <td className="p-2 border">{service.name}</td>
                                <td className="p-2 border">{service.description}</td>
                                <td className="p-2 border text-right">
                                    ${service.price.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
