/* import { useEffect } from "react";
import React, { useState } from 'react';
import "./inventoryBalance.css"
function Products() {
    
    
    useEffect(() => {
      const fetchData = () => {
      fetch('http://127.0.0.1:5000/products')
        .then((response) => response.json())
        .then((data) => setInventoryData(data))
        .catch((error) => console.log('Error fetching data:', error));
    };

    // Fetch data immediately
    fetchData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
    }, []);

    const [inventoryData, setInventoryData] = useState([]);

 
  
    return (
      <>
      <div class="hej">
      {inventoryData.map(item => (
        <div key={item.ID}>
          <div className="hejhej">
            ID: {item.ID}<br></br>
            Inventory Number: {item.ProductNumber} <br></br>
            Destination: {item.Name} <br></br>
            Price : {item.Price} <br></br>
            </div>
        </div>
      ))}
    </div>
    <div>
    <label>Product </label>
    <input type="password" name="pass"/>
    <label>Destination </label>
    <input type="password" name="pass"/>
    <label>Password </label>
    <input type="password" name="pass"/>
    <div className="button-container">
    <input type="submit" placeholder="Add" />
    </div>
    </div>
    </>
    );
  }
  

export default Products */