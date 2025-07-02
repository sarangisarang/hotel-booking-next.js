import * as XLSX from 'xlsx';

interface Booking {
    guestName: string;
    roomNumber: string;
    checkInDate: string;
    checkOutDate: string;
    totalAmount: number;
    paymentStatus: string;
}

export const exportToExcel = (bookings: Booking[]) => {
    const worksheet = XLSX.utils.json_to_sheet(
        bookings.map((booking) => ({
            Guest: booking.guestName,
            Room: booking.roomNumber,
            'Check In': booking.checkInDate,
            'Check Out': booking.checkOutDate,
            Total: `$${booking.totalAmount.toFixed(2)}`,
    Payment: booking.paymentStatus,
}))
);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');

    XLSX.writeFile(workbook, 'bookings.xlsx');
};