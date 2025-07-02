"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    date: string;
}

export default function NotificationListPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/notifications");
                setNotifications(response.data);
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Notifications List</h1>
            {loading ? (
                <p>Loading notifications...</p>
            ) : notifications.length === 0 ? (
                <p>No notifications found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border bg-white rounded shadow">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Title</th>
                            <th className="p-2 border">Message</th>
                            <th className="p-2 border">Type</th>
                            <th className="p-2 border">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {notifications.map((notification) => (
                            <tr key={notification.id} className="hover:bg-gray-100">
                                <td className="p-2 border text-center">{notification.id}</td>
                                <td className="p-2 border">{notification.title}</td>
                                <td className="p-2 border">{notification.message}</td>
                                <td className="p-2 border text-center">{notification.type}</td>
                                <td className="p-2 border text-center">{notification.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
