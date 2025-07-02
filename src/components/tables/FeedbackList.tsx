"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Feedback {
    id: number;
    guestName: string;
    message: string;
    rating: number;
    date: string;
}

export default function FeedbackListPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/feedback");
                setFeedbacks(response.data);
            } catch (error) {
                console.error("Failed to fetch feedbacks", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeedbacks();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Feedback / Reviews List</h1>
            {loading ? (
                <p>Loading feedbacks...</p>
            ) : feedbacks.length === 0 ? (
                <p>No feedback found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border bg-white rounded shadow">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Guest Name</th>
                            <th className="p-2 border">Message</th>
                            <th className="p-2 border">Rating</th>
                            <th className="p-2 border">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {feedbacks.map((fb) => (
                            <tr key={fb.id} className="hover:bg-gray-100">
                                <td className="p-2 border text-center">{fb.id}</td>
                                <td className="p-2 border">{fb.guestName}</td>
                                <td className="p-2 border">{fb.message}</td>
                                <td className="p-2 border text-center">{fb.rating} ⭐</td>
                                <td className="p-2 border text-center">{fb.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
