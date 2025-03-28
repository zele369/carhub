import React from 'react'
import BookingList from './BookingList'

const Booked = () => {
  return (
    <div>
      <BookingList isBooked={true}/>
    </div>
  )
}

export default Booked