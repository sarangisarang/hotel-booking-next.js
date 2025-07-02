import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Sidebar />
        <div style={{ marginLeft: "220px", padding: "24px" }}>
            {children}
        </div>
        </body>
        </html>
    );
}
