import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Navbar from './navbar';

function Cars() {
    const { id } = useParams();
    const [carData, setCarData] = useState(null);
    const [image, setImage] = useState(null);

const handleUpdate = async () => {
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
    });
    console.log('Update response:', response);
}
const handleDelete = async () => {
    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
    });
    console.log('Update response:', response);
}

    useEffect(() => {
        const fetchCarData = async () => {
            const response = await fetch(`http://localhost:8080/api/products/${id}`);
            const data = await response.json();
            setCarData(data);
        try {
          const response = await fetch(`http://localhost:8080/api/products/${id}/image`,{responseType: 'blob'});
          const data = await response.blob();
          setImage(URL.createObjectURL(data));
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
         }
        fetchCarData();
    }, [id]);
  return (
    <>
    <Navbar/>
    <h1>Hello cars</h1>
    <h2>Product ID: {id}</h2>
    {carData && (
        <div>
            <img src={image} alt="img" width={400} />
            <h3>{carData.name}</h3>
            <p>{carData.description}</p>
            <p>Price: ${carData.price}</p>
            <p>Quantity: {carData.quantity}</p>
            <p>Release Date: {carData.release_date}</p>
            <button className='btn btn-primary' onClick={handleUpdate} >update</button>
            <button className='btn btn-danger' onClick={handleDelete}>delete</button>
        </div>
    )}
    {!carData && <p>Loading...</p>}
    </>
  )
}

export default Cars;
