import { useEffect } from "react";
import React, { useState } from 'react';
import "./inventoryBalance.css"
function Inventory() {
  
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryNumber, setinventoryNumber] = useState('');
  const [city, setCity] = useState('');


  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/inventory')
      .then((response) => response.json())
      .then((data) => setInventoryData(data))
      .catch((error) => console.error('Error:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      inventoryNumber: inventoryNumber,
      city: city
    };

    fetch('http://127.0.0.1:8000/add/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        fetchData(); // Refresh the inventory data after successful insertion
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Reset form values
    setinventoryNumber('');
    setCity('');
  };

  return (
    <>
      <div className="hej">
      {inventoryData.map(item => (
        <div key={item.ID}>
          <div className="hejhej">
            Inventory Number: {item.InventoryNumber} <br></br>
            City: {item.City}
          </div>
        </div>
      ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Inventory Number</label>
          <input
            type="text"
            value={inventoryNumber}
            onChange={(e) => setinventoryNumber(e.target.value)}
          />
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="button-container">
            <input type="submit" value="Add" />
          </div>
        </form>
      </div>
    </>
  );
  }
  

export default Inventory