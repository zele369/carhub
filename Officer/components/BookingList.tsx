"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type Booking = {
  _id: string
  fullName: string
  email: string
  phoneNo: string
  pickUpDate: string
  returnDate: string
  totalPrice: string
  paymentStatus: string
  car: {
    make: string
    model: string
  }
}

export const BookingList = ({isBooked}: {isBooked?: boolean}) => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    status: "",
  })

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/booking');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const bookings = await response.json();
        // Filter for only paid bookings if isBooked is true
        const filteredBookings = isBooked 
          ? bookings.filter((booking: Booking) => booking.paymentStatus === 'paid')
          : bookings;
        setBookings(filteredBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [isBooked]);

  const handleFilterChange = (key: string, value: string) => {
      setFilters({ ...filters, [key]: value })
    }
    
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/booking?id=${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
        throw new Error('Failed to delete booking');
    }

    // Remove the deleted booking from the state
    setBookings(bookings.filter(apt => apt._id !== id));
} catch (error) {
    console.error("Error deleting booking:", error);
}
};

const filteredBookings = bookings.filter((apt) => {
    return (
        (filters.name === "" || apt.fullName.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.date === "" || new Date(apt.pickUpDate).toDateString() === new Date(filters.date).toDateString()) &&
        (filters.status === "all" || apt.paymentStatus === filters.status)
    )
})
console.log(filteredBookings) 

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <Input 
          type="date" 
          value={filters.date} 
          onChange={(e) => handleFilterChange("date", e.target.value)} 
        />
        <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Pick Up Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(filteredBookings.length > 0 ? (filteredBookings): (bookings)).map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book.fullName}</TableCell>
              <TableCell>{book.email}</TableCell>
              <TableCell>{book.phoneNo}</TableCell>
              <TableCell>{`${book.car.make} ${book.car.model}`}</TableCell>
              <TableCell>{new Date(book.pickUpDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(book.returnDate).toLocaleDateString()}</TableCell>
              <TableCell>${book.totalPrice}</TableCell>
              <TableCell>{book.paymentStatus}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2 bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default BookingList

