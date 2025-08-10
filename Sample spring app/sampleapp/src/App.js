
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Cars from './components/Cars';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/updateProduct';

function App() {
  return (
    <>
    {/* <Navbar/> */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<Cars />} />
      <Route path="/products/addProducts" element={<AddProduct />} />
      <Route path="/product/update/:id" element={<UpdateProduct />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
