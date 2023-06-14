import { useEffect } from "react";
import React, { useState } from 'react';
import "./general.css"
function Products() {
  
  const [inventoryData, setInventoryData] = useState([]);
  const [productNumber, setProductNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [removeItem , setRemoveItem] = useState(''); 


  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/products')
      .then((response) => response.json())
      .then((data) => setInventoryData(data))
      .catch((error) => console.error('Error:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      productNumber: productNumber,
      productName: productName,
      price: price,
    };

    fetch('http://127.0.0.1:8000/add/products', {
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
    setProductNumber('');
    setProductName('');
    setPrice('');
  };

  const handleRemove = (e) => {
    e.preventDefault();

    const newData = {
      id : removeItem
    };

    fetch('http://127.0.0.1:8000/remove/products', {
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
            Produktnr: {item.ProductNumber} <br></br>
            Benämning: {item.Name} <br></br>
            Pris: {item.Price}<br></br>
            ID : {item.ID}
            </div>
        </div>
      ))}
      </div>
      <div className="whole-form">
      <div className='add-form'>
        <form onSubmit={handleSubmit}>
          <label>Produktnr: </label>
          <input
            type="text"
            value={productNumber}
            onChange={(e) => setProductNumber(e.target.value)}
          />
          <label>Benämning: </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label>Pris: </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
  

export default Products