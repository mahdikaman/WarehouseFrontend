import React, { useState, useEffect } from 'react';
import "./general.css"

function Delivery() {
  const [deliveryData, setDeliveryData] = useState([]);
  const [product, setProduct] = useState('');
  const [destination, setDestination] = useState('');
  const [quantity, setQuantity] = useState('');
  const [removeItem , setRemoveItem] = useState(''); 

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/delivery')
      .then((response) => response.json())
      .then((data) => setDeliveryData(data))
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

  const handleRemove = (e) => {
    e.preventDefault();

    const newData = {
      id : removeItem
    };

    fetch('http://127.0.0.1:8000/remove/delivery', {
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
      {deliveryData.map(item => (
        <div key={item.ID}>
          <div className="info-form">
            Datum: {item.Date} <br></br>
            Produkt: {item.Name} <br></br>
            Till/Från: {item.Destination}<br></br>
            Antal : {item.Quantity}<br></br>
            ID : {item.ID}
            </div>
        </div>
      ))}
      </div>
      <div className="whole-form">
      <div className='add-form'>
        <form onSubmit={handleSubmit}>
          <label>Produkt: </label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
          <label>Till/Från: </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <label>Antal: </label>
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

export default Delivery;
