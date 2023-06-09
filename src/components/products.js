import { useEffect } from "react";
import React, { useState } from 'react';
import "./inventoryBalance.css"
function Products() {
  
  const [inventoryData, setInventoryData] = useState([]);
  const [productNumber, setProductNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');

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

  return (
    <>
      <div className="hej">
      {inventoryData.map(item => (
        <div key={item.ID}>
          <div className="hejhej">
            Product: {item.ProductNumber} <br></br>
            Name: {item.Name} <br></br>
            Price: {item.Price}
            </div>
        </div>
      ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Product</label>
          <input
            type="text"
            value={productNumber}
            onChange={(e) => setProductNumber(e.target.value)}
          />
          <label>Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label>Price</label>
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
    </>
  );
  }
  

export default Products