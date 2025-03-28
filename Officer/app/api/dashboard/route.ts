import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/actions/user.action";
import { getBooks } from "@/lib/actions/book.action";

interface User {
  createdAt: string;
}

interface Booking {
  createdAt: string;
}

export async function GET() {
  try {
    const [users, bookings] = await Promise.all([
      getAllUsers(),
      getBooks()
    ]);

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate statistics
    const totalUsers = users?.length || 0;
    const newUsers = users?.filter((user: User) => {
      const userDate = new Date(user.createdAt);
      return userDate >= today;
    }).length || 0;

    const totalBookings = bookings?.length || 0;
    const todayBookings = bookings?.filter((booking: Booking) => {
      const bookingDate = new Date(booking.createdAt);
      return bookingDate >= today;
    }).length || 0;

    // Calculate percentage changes (mock data for now since we don't have historical data)
    const userGrowth = "+20%"; // This would normally be calculated from historical data
    const bookingGrowth = "+5%"; // This would normally be calculated from historical data

    return NextResponse.json({
      totalUsers,
      newUsers,
      totalBookings,
      todayBookings,
      userGrowth,
      bookingGrowth
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
} 