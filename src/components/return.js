import React, { useState, useEffect } from 'react';
import "./general.css";

function CarUnBooking() {
  const [bookningsId, setbookningsId] = useState('');
  const [antalKm, setantalKm] = useState('');
  const [dagarUthyrning, setdagarUthyrning] = useState('');
  const [bookingId, setBookingId] = useState(null);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
  
    const newBooking = {
      bookningsId: bookningsId,
      antalKm: antalKm,
      dagarUthyrning: dagarUthyrning,
    };
    

    const bookings = [newBooking];
    
    console.log("Booking Data:", bookings);
    
    try {
      const response = await fetch('http://localhost:8080/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookings), 
      });
    
      if (response.ok) {
        const bookingData = await response.json();
        console.log('Booking submitted successfully:', bookingData);
        setBookingId(bookingData[0].id); 
      } else {
        console.error('Failed to submit booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting booking:', error.message);
    }
    
  
    setbookningsId('');
    setantalKm('');
    setdagarUthyrning('');
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
               value={bookningsId}
               onChange={(e) => setbookningsId(e.target.value)}
            />
            <label>Fordonstyp: </label>
            <select
              value={antalKm}
              onChange={(e) => setantalKm(e.target.value)}
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
              value={dagarUthyrning}
              onChange={(e) => setdagarUthyrning(e.target.value)}
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

export default CarUnBooking;
