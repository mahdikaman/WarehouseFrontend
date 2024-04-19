import React, { useState, useEffect } from 'react';
import "./general.css";

function CarBooking() {
  const [kundensFödelseDatum, setkundensFödelseDatum] = useState('');
  const [fordonsKategori, setfordonsKategori] = useState('');
  const [uthyrningDatum, setuthyrningDatum] = useState('');
  const [bookingId, setBookingId] = useState(null);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
  
    const newBooking = {
      kundensFödelseDatum: kundensFödelseDatum,
      fordonsKategori: fordonsKategori,
      uthyrningDatum: uthyrningDatum,
    };
    

    const bookings = [newBooking];
    
    console.log("Booking Data:", bookings);
    
    try {
      const response = await fetch('http://localhost:8080/api/skapa/bokning', {
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
    

  };

  useEffect(() => {
    
    const fetchBookingData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/hämta/bokning');
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
               value={kundensFödelseDatum}
               onChange={(e) => setkundensFödelseDatum(e.target.value)}
            />
            <label>Fordonstyp: </label>
            <select
              value={fordonsKategori}
              onChange={(e) => setfordonsKategori(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="småbilar">Litet Fordon</option>
              <option value="vans">Van</option>
              <option value="minibuss">Minibuss</option>
            </select>
            <label>Bokningsdatum: </label>
            <input
              type="datetime-local"
              value={uthyrningDatum}
              onChange={(e) => setuthyrningDatum(e.target.value)}
            />
            <div className="button-container">
              <input type="submit" value="Boka" />
            </div>
          </form>
        </div>
        {bookingId &&(
          <div className="kr">
            <p>BokninsID: {bookingId}</p> <br />
            <p>Personnummer: {kundensFödelseDatum}</p> <br />
            <p>Fordonstyp: {fordonsKategori}</p> <br />
            <p>Datum: {uthyrningDatum}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default CarBooking;
