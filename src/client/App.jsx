import style from './index.module.sass'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./layouts/navbar.jsx";
import Login from "./pages/login/Login.jsx";
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import NewPassword from './pages/newPassword/NewPassword';
import Products from './pages/products/Products';

function App() {
  return (
    <BrowserRouter >
      <div className={style.App}>
      <NavBar />
        <Routes>
          <Route extract path='/login' element={<Login />} />
          <Route extract path='/register' element={<Register />} />
          <Route extract path='/products' element={<Products />} />
          <Route extract path='/forgotpassword' element={<ForgotPassword />} />
          <Route extract path='/newpassword' element={<NewPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
