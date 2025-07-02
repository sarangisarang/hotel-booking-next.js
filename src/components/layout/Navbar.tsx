import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link href="/public" className="text-xl font-bold text-blue-600">
                Guest Management
            </Link>
            <div className="space-x-4">
                <Link href="/add-guest" className="text-gray-700 hover:text-blue-600">Add Guest</Link>
                <Link href="/guests" className="text-gray-700 hover:text-blue-600">Guest List</Link>
                <Link href="/guest-functions" className="text-gray-700 hover:text-blue-600">Functions</Link>
            </div>
        </nav>
    );
}