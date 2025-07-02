import Link from "next/link";

export default function GuestFunctions() {
    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Guest Functions</h1>
            <div className="flex flex-col items-center space-y-4">
                <Link href="/guests" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow">View Guests</Link>
                <Link href="/add-guest" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow">Add New Guest</Link>
                <button className="bg-yellow-500 text-white px-6 py-2 rounded shadow" disabled>Edit Guest (Coming)</button>
                <button className="bg-red-500 text-white px-6 py-2 rounded shadow" disabled>Delete Guest (On List)</button>
                <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow">Back to Home</Link>
            </div>
        </div>
    );
}
