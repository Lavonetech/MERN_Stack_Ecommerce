import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

import ProductDetails from './screens/productDetails';

import Cart from './screens/Cart';
import CheckoutForm from './screens/CheckoutForm';
import CreateProduct from './admin/CreateProduct';
import PrivateRoutes from './utils/PrivateRoute';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/cart" element={<Cart/>} />
          <Route path="/" element={<Home />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productDetails/:id" element={<ProductDetails/>} />
          <Route path="/checkout" element={<CheckoutForm/>} />
          
        
           <Route  element={<PrivateRoutes />}>
        <Route path="/createproduct" element={<CreateProduct />} />
      </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
