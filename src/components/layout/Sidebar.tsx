"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaHotel,
    FaPlus,
    FaBed,
    FaDoorOpen,
    FaUsers,
    FaUserPlus,
    FaClipboardList,
    FaClipboardCheck,
    FaMoneyBillWave,
    FaUserTie,
    FaCog,
    FaTools,
    FaStickyNote,
    FaChartBar,
    FaBell,
    FaCalendarAlt,
    FaImage,
    FaSearch,
    FaFileAlt,
    FaDatabase,
    FaFileInvoiceDollar,
} from "react-icons/fa";

const navItems = [
    { name: "Add Hotel", href: "/add-hotel", icon: <FaPlus /> },
    { name: "Hotel", href: "/hotel", icon: <FaHotel /> },
    { name: "Room Types", href: "/room-types", icon: <FaBed /> },
    { name: "Add Room Type", href: "/add-room-type", icon: <FaPlus /> },
    { name: "Rooms", href: "/rooms", icon: <FaDoorOpen /> },
    { name: "Guests", href: "/guests", icon: <FaUsers /> },
    { name: "Add Guest", href: "/add-guest", icon: <FaUserPlus /> },
    { name: "Bookings", href: "/bookings", icon: <FaClipboardList /> },
    { name: "Add Bookings", href: "/add-bookings", icon: <FaClipboardCheck /> },
    { name: "Payments", href: "/payments", icon: <FaMoneyBillWave /> },
    { name: "Add Payment", href: "/add-payment", icon: <FaPlus /> }, // ✅ ახალი ღილაკი
    { name: "Employees", href: "/employees", icon: <FaUserTie /> },
    { name: "Add Employee", href: "/add-employees", icon: <FaUserPlus /> },
    { name: "Add Room", href: "/add-room", icon: <FaPlus /> },
    { name: "Services", href: "/services", icon: <FaCog /> },
    { name: "Add Service", href: "/add-service", icon: <FaPlus /> },
    { name: "Service Requests", href: "/service-requests", icon: <FaTools /> },
    { name: "Add Service Request", href: "/add-service-request", icon: <FaPlus /> },
    { name: "Feedback / Reviews", href: "/feedback", icon: <FaStickyNote /> },
    { name: "Dashboard / Analytics", href: "/dashboard", icon: <FaChartBar /> },
    { name: "Notifications", href: "/notifications", icon: <FaBell /> },
    { name: "Room Calendar", href: "/room-calendar", icon: <FaCalendarAlt /> },
    { name: "Image Upload", href: "/image-upload", icon: <FaImage /> },
    { name: "Search & Filter", href: "/search-filter", icon: <FaSearch /> },
    { name: "Reports", href: "/reports", icon: <FaFileAlt /> },
    { name: "Database Backup", href: "/backup", icon: <FaDatabase /> },
    { name: "PDF Invoice", href: "/pdf-invoice", icon: <FaFileInvoiceDollar /> },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <nav
            style={{
                width: "220px",
                height: "100vh",
                background: "#f9fafb",
                padding: "1rem 0.5rem 1rem 1rem",
                borderRight: "1px solid #e0e0e0",
                overflowY: "auto",
                fontFamily: "'Segoe UI', sans-serif",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={index} style={{ marginBottom: "0.4rem" }}>
                            <Link href={item.href} passHref>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.6rem",
                                        padding: "0.5rem 0.7rem",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        color: isActive ? "#ffffff" : "#333333",
                                        backgroundColor: isActive ? "#3498db" : "transparent",
                                        transition: "all 0.3s ease",
                                        fontSize: "0.96rem",
                                        fontWeight: isActive ? 600 : 500,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            const el = e.currentTarget as HTMLDivElement;
                                            el.style.backgroundColor = "#ecf0f1";
                                            el.style.transform = "translateX(5px)";
                                            el.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            const el = e.currentTarget as HTMLDivElement;
                                            el.style.backgroundColor = "transparent";
                                            el.style.transform = "translateX(0)";
                                            el.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "1.2rem",
                                            transition: "transform 0.3s ease",
                                            color: isActive ? "#ffffff" : "#3498db",
                                        }}
                                    >
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
