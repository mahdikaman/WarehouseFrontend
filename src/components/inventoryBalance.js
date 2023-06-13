import React, { useState, useEffect } from 'react';
import "./general.css"

function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);


  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/total')
      .then((response) => response.json())
      .then((data) => setInventoryData(data))
      .catch((error) => console.error('Error:', error));
  };

  

  return (
    <>
      <div className="hej">
      {inventoryData.map(item => (
        <div key={item.ID}>
          <div className="hejhej">
            Product: {item.Product} <br></br>
            Destination: {item.destination} <br></br>
            Sum of Quantity: {item['Sum of quantity']}
            </div>
        </div>
      ))}
      </div>
      
    </>
  );
}

export default Inventory;
