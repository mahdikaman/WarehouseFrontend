import { useEffect } from "react";
import React, { useState } from 'react';
import "./general.css"

function Inventory() {
  
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryNumber, setinventoryNumber] = useState('');
  const [city, setCity] = useState('');
  const [removeItem , setRemoveItem] = useState(''); 

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

  const handleRemove = (e) => {
    e.preventDefault();

    const newData = {
      id : removeItem
    };

    fetch('http://127.0.0.1:8000/remove/inventory', {
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
    setRemoveItem('');
  };

  return (
    <>
      <div className="content-form">
      {inventoryData.map(item => (
        <div key={item.ID}>
          <div className="info-form">
            Lagernr: {item.InventoryNumber} <br></br>
            Stad: {item.City}<br></br>
            ID : {item.ID}
          </div>
        </div>
      ))}
      </div>
      <div className="whole-form">
      <div className='add-form'>
        <form onSubmit={handleSubmit}>
          <label>Lagernr: </label>
          <input
            type="text"
            value={inventoryNumber}
            onChange={(e) => setinventoryNumber(e.target.value)}
          />
          <label>Stad: </label>
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
      <div>
        <form onSubmit={handleRemove}>
      <label>ID: </label>
          <input
            type="text"
            value={removeItem}
            onChange={(e) => setRemoveItem(e.target.value)}
          />
          <div className="button-container">
            <input type="submit" value="Remove" />
          </div>
        </form>
      </div>
      </div>
    </>
  );
  }
  

export default Inventory