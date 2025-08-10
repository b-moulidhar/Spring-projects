import React, { useEffect } from 'react'
import { Link } from 'react-router';

function Products({item, ...props}) {
    const [image, setImage] = React.useState(null);
    useEffect(()=>{
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/products/${item.id}/image`,{responseType: 'blob'});
          const data = await response.blob();
          setImage(URL.createObjectURL(data));
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      }
      fetchData()
    },[item.id])
  return (
  <>
    <Link className='box' to={`/products/${item.id}`}>
      <img src={image} alt="img" width={150} />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <button className='btn btn-primary'>add to cart</button>
        <button><Link to={`/product/update/${item.id}`}>update</Link></button>
        </Link>
  </>
  )
}

export default Products
