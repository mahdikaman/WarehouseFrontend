import React, { useState, useEffect } from 'react';
import "./general.css";

function CarUnBooking() {
  const [bookningsId, setbookningsId] = useState('');
  const [antalKm, setantalKm] = useState('');
  const [dagarUthyrning, setdagarUthyrning] = useState('');
  const [price, setprice] = useState(null);

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
      const response = await fetch('http://localhost:8080/api/skapa/pris', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookings), 
      });
    
      if (response.ok) {
        const bookingData = await response.json();
        console.log('Booking submitted successfully:', bookingData);
        setprice(bookingData[0].id); 
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
        const response = await fetch('http://localhost:8080/api/hämta/pris');
        if (response.ok) {
          const bookingData = await response.json();
          setprice(bookingData.id); 
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
            <label>BookningsID: </label>
            <input
               type="text"
               value={bookningsId}
               onChange={(e) => setbookningsId(e.target.value)}
            />
            <label>AntalKM: </label>
            <input
               type="number"
               value={antalKm}
               onChange={(e) => setantalKm(e.target.value)}
            />
            <label>Antal Dagar: </label>
            <input
               type="number"
               value={dagarUthyrning}
               onChange={(e) => setdagarUthyrning(e.target.value)}
            />
            <div className="button-container">
              <input type="submit" value="Lämna" />
            </div>
          </form>
        </div>
        {price && (
          <div className="whole-form">
            Booking ID: {price}
          </div>
        )}
      </div>
    </>
  );
}

export default CarUnBooking;
