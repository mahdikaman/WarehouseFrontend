import React, { useState, useEffect } from 'react';

function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [product, setProduct] = useState('');
  const [destination, setDestination] = useState('');
  const [quantity, setQuantity] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      product: product,
      destination: destination,
      quantity: quantity,
    };

    fetch('http://127.0.0.1:8000/add/delivery', {
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
    setProduct('');
    setDestination('');
    setQuantity('');
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
      <div>
        <form onSubmit={handleSubmit}>
          <label>Product </label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <label>Destination </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <label>Quantity </label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="button-container">
            <input type="submit" value="Add" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Inventory;
