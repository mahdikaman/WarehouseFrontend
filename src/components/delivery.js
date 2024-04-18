import React, { useState, useEffect } from 'react';
import "./general.css";

function CarBooking() {
  const [customerBirthdate, setCustomerBirthdate] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [rentalDateTime, setRentalDateTime] = useState('');
  const [bookingId, setBookingId] = useState(null);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
  
    const newBooking = {
      customerBirthdate: customerBirthdate,
      vehicleCategory: vehicleCategory,
      rentalDateTime: rentalDateTime,
    };
    
    // Create an array with a single booking object
    const bookings = [newBooking];
    
    console.log("Booking Data:", bookings);
    
    try {
      const response = await fetch('http://localhost:8080/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookings), // Send as an array
      });
    
      if (response.ok) {
        const bookingData = await response.json();
        console.log('Booking submitted successfully:', bookingData);
        setBookingId(bookingData[0].id); // Assuming the response is an array with a single booking
      } else {
        console.error('Failed to submit booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting booking:', error.message);
    }
    
  
    setCustomerBirthdate('');
    setVehicleCategory('');
    setRentalDateTime('');
  };

  useEffect(() => {
    
    const fetchBookingData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/bookings/all');
        if (response.ok) {
          const bookingData = await response.json();
          setBookingId(bookingData.id); 
        } else {
          console.error('Failed to fetch booking data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching booking data:', error.message);
      }
    };

    fetchBookingData();
  }, []);

  return (
    <>
      <div className="whole-form">
        <div className='add-form'>
          <form onSubmit={handleBookingSubmit}>
            <label>Personnummer: </label>
            <input
               type="number"
               value={customerBirthdate}
               onChange={(e) => setCustomerBirthdate(e.target.value)}
            />
            <label>Fordonstyp: </label>
            <select
              value={vehicleCategory}
              onChange={(e) => setVehicleCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Compact">Litet Fordon</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Stort Fordon</option>
              <option value="minibuss">Minibuss</option>
            </select>
            <label>Bokningsdatum: </label>
            <input
              type="datetime-local"
              value={rentalDateTime}
              onChange={(e) => setRentalDateTime(e.target.value)}
            />
            <div className="button-container">
              <input type="submit" value="Boka" />
            </div>
          </form>
        </div>
        {bookingId && (
          <div className="whole-form">
            Booking ID: {bookingId}
          </div>
        )}
      </div>
    </>
  );
}

export default CarBooking;
