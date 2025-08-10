import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import { useParams } from 'react-router';

function UpdateProduct() {

    const { id } = useParams();
    const [name, setName] = useState({
        id: '',
        name: '',
        description: '',
        brand: '',
        price: '',
        category: '',
        release_date: '',
        available: '',
        quantity: '',
    });
    const [image, setImage] = useState(null);

const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setName((prev) => ({
        ...prev,
        [id]: type === "checkbox" ? checked : value
    }));
};

const handleImageChange = (e) => {
    setImage(e.target.files[0]);
}

const formatDate = (isoDate) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
};
// const handleSubmit = async (e) => {

//     const formData = new FormData();
//     const formattedDate = formatDate(name.release_date);
//     const productData = { ...name, release_date: formattedDate };
    
//     formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));

//     if (image) {
//         formData.append('imageFile', image);
//     }

//     try {
//         const fetchData = await fetch('http://localhost:8080/api/product', {
//             method: 'POST',
//             body: formData,
//         });

//         if (fetchData.ok) {
//             const response = await fetchData.json();
//             console.log('Product added successfully:', response);
//             alert('Product added successfully');
//         } else {
//             console.error('Error adding product:', fetchData.statusText);
//             alert('Failed to add product');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred while adding the product');
//     }
// };

const handleUpdate = async () => {
     const formData = new FormData();
    const formattedDate = formatDate(name.release_date);
    const productData = { ...name, release_date: formattedDate };
    
    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));

    if (image) {
        formData.append('imageFile', image);
    }

    try {
        const fetchData = await fetch(`http://localhost:8080/api/products/${name.id}`, {
            method: 'PUT',
            body: formData,
        });

        if (fetchData.ok) {
            const response = await fetchData.json();
            console.log('Product added successfully:', response);
            alert('Product added successfully');
        } else {
            console.error('Error adding product:', fetchData.statusText);
            alert('Failed to add product');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the product');
    }
}

useEffect(() => {
        const fetchCarData = async () => {
            const response = await fetch(`http://localhost:8080/api/products/${id}`);
            const data = await response.json();
            console.log('Fetched product data:', data);
            const [day, month, year] = data.release_date.split("/");
            const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            setName((prev)=> ({
                ...prev,
                id: data.id,
                name: data.name,
                description: data.description,
                brand: data.brand,
                price: data.price,
                category: data.category,
                release_date: formattedDate,
                available: data.available,
                quantity: data.quantity
            }));
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
    <div>
        <Navbar/>
        <div className="container">

        <div className="mb-3">
            <label htmlFor="name" className="form-label">Id</label>
            <input type="text" className="form-control" id="name" disabled value={name.id} required aria-describedby="name" />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" onChange={(e)=>{handleChange(e)}} value={name.name} required aria-describedby="name" />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" onChange={(e)=>{handleChange(e)}} value={name.description} required aria-describedby="desc" />
        </div>
        <div className="mb-3">
            <label htmlFor="brand" className="form-label">Brand</label>
            <input type="text" className="form-control" id="brand" onChange={(e)=>{handleChange(e)}} value={name.brand} required aria-describedby="brand" />
        </div>
        <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" onChange={(e)=>{handleChange(e)}} value={name.price} required aria-describedby="price" />
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control" id="category" onChange={(e)=>{handleChange(e)}}  value={name.category} required aria-describedby="category" />
        </div>
        <div className="mb-3">
            <label htmlFor="release_date" className="form-label">Release Date</label>
            <input type="date" className="form-control" id="release_date" onChange={(e)=>{handleChange(e)}} value={name.release_date} required aria-describedby="reldate" />
        </div>
        
        <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input type="number" className="form-control" id="quantity" onChange={(e)=>{handleChange(e)}} value={name.quantity} required aria-describedby="qty" />
        </div>
        <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Image</label>
            <input type="file" className="form-control" id="quantity" onChange={(e)=>{handleImageChange(e)}}  aria-describedby="img" />
        </div>
        <div className="mb-3">
            <label htmlFor="available" className="form-label">Available </label> &nbsp;
            <input type="checkbox"  id="available" onChange={(e)=>{handleChange(e)}} value={name.available} required aria-describedby="avail" />
        </div>
        {/* <button className="btn btn-primary" onClick={()=>handleSubmit()} >add Product</button> */}
        <button className='btn btn-primary' onClick={handleUpdate}>update</button>

        </div>

    </div>
  )
}

export default UpdateProduct
