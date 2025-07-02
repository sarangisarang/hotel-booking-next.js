import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Booking } from "../tables/BookingList";

/**
 * Exports the provided bookings array to a formatted PDF file using jsPDF and jspdf-autotable.
 * @param bookings Array of Booking objects to export
 */
export const exportToPDF = (bookings: Booking[]): void => {
    // Initialize a new PDF document
    const doc = new jsPDF();

    // Add the title text at position x:14, y:20
    doc.text("📒 Booking List", 14, 20);

    // Define table column headers
    const tableColumn: string[] = ["Guest", "Room", "Check In", "Check Out", "Total", "Payment"];
    // Initialize an empty array to hold booking data rows
    const tableRows: any[] = [];

    // Populate table rows with data from bookings
    bookings.forEach((booking: Booking) => {
        const bookingData = [
            // Room number
            booking.checkInDate,                         // Check-in date
            booking.checkOutDate,                        // Check-out date
            `$${booking.totalAmount.toFixed(2)}`,        // Total amount formatted with $
            booking.paymentStatus,                       // Payment status (e.g., PAID)
        ];
        tableRows.push(bookingData);
    });

    // Generate the table in the PDF using autoTable
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,                                     // Table starting y-position
        theme: "grid",                                 // Grid theme for visible borders
        headStyles: { fillColor: [100, 149, 237] },    // Header row color: Cornflower Blue
        alternateRowStyles: { fillColor: [240, 240, 240] }, // Light grey alternate row coloring
        styles: { cellPadding: 3, fontSize: 10 },      // Table cell padding and font size
    });

    // Save the generated PDF with a predefined filename
    doc.save("booking_list.pdf");
};