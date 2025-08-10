import React, { useEffect, useState } from 'react'
import Products from './products';
import Navbar from './navbar';

function Home() {
    const [data, setData] = useState([]);
useEffect(() => {
   const fetctData = async() =>{
    try {
   const response = await fetch('http://localhost:8080/api/products')
   const datas = await response.json();
    console.log('Data fetched:', datas);
    setData(datas);
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetctData();
},[])

  return (
    <>
    <Navbar/>
    <div className='container flex justify-center'>
      {data.length>0?(data.map((item, index) => (
        
        <Products key={index} item={item} />
      ))): (<div>something went wrong</div>)  }
    </div>
    </>
  )
}

export default Home
