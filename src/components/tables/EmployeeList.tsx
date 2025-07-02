"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Staff {
    staffID: string;
    firstName: string;
    lastName: string;
    positions: string;
    email: string;
    phone: string;
    salary: number;
}

export default function EmployeeListPage() {
    const [employees, setEmployees] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/staff");
                setEmployees(response.data);
            } catch (error) {
                console.error("Failed to fetch staff members", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Staff List</h1>
            {loading ? (
                <p>Loading staff members...</p>
            ) : employees.length === 0 ? (
                <p>No staff members found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border bg-white rounded shadow">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">First Name</th>
                            <th className="p-2 border">Last Name</th>
                            <th className="p-2 border">Position</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Salary</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((staff) => (
                            <tr key={staff.staffID} className="hover:bg-gray-100">
                                <td className="p-2 border text-center">{staff.staffID}</td>
                                <td className="p-2 border">{staff.firstName}</td>
                                <td className="p-2 border">{staff.lastName}</td>
                                <td className="p-2 border">{staff.positions}</td>
                                <td className="p-2 border">{staff.email}</td>
                                <td className="p-2 border">{staff.phone}</td>
                                <td className="p-2 border text-right">{staff.salary.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
