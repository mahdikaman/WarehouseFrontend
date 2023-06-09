/* import { useEffect } from "react";
import React, { useState } from 'react';
import "./inventoryBalance.css"
function Inventory() {
    
    
    useEffect(() => {
      fetch(`http://127.0.0.1:5000/inventory`)
        .then((response) => response.json())
        .then((data) => setInventoryData(data));
    }, []);

    const [inventoryData, setInventoryData] = useState([]);

 
  
    return (
      <>
      <div class="hej">
      {inventoryData.map(item => (
        <div key={item.ID}>
          <div className="hejhej">
            ID: {item.ID}<br></br>
            Inventory Number: {item.InventoryNumber} <br></br>
            Destination: {item.City} <br></br>
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
  

export default Inventory */