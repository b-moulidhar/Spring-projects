import React, { useState } from 'react'
import { Link } from 'react-router'

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // const searchRef = useRef(null);
    const handleSearch =async () => {
        // Implement search functionality here
        const response = fetch(`http://localhost:8080/api/products/search?query=${searchTerm}`);
        const data = await response;
        setSearchResults(data);

    }

  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to={"/products/addProducts"}>Add Products</Link>
        </li>
        <li className="nav-item">
          <input type="text" name="" id="" onChange={(e)=>setSearchTerm(e.target.value)}/><span onClick={()=>handleSearch()}>Search</span>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
