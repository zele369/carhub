import { NextResponse } from "next/server";
import { getBooks, deleteBooking } from "@/lib/actions/book.action";
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]/options";
import mongoose from 'mongoose';
import Car from "@/lib/database/models/car.model";

export async function GET() {
  try {
    // Get the session but don't require it
    const session = await getServerSession(options);
    
    // Ensure database connection is established
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URL!);
    }

    // The Car model will be automatically registered when imported
    // No need to check mongoose.models.Car explicitly
    
    // Log for debugging
    console.log("Session in booking API:", session);
    console.log("Attempting to fetch bookings...");

    const bookings = await getBooks();
    
    if (!bookings) {
      console.log("No bookings found");
      return NextResponse.json(
        { message: "No bookings found or database error" },
        { status: 404 }
      );
    }

    // Log success
    console.log("Bookings fetched successfully");
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Booking GET Error:", error);
    return NextResponse.json(
      { 
        message: "Failed to fetch bookings", 
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Require authentication for DELETE operations
    const session = await getServerSession(options);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Booking ID is required" },
        { status: 400 }
      );
    }

    const deletedBooking = await deleteBooking(id);
    return NextResponse.json(deletedBooking, { status: 200 });
  } catch (error) {
    console.error("Delete booking error:", error);
    return NextResponse.json(
      { message: "Failed to delete booking", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
