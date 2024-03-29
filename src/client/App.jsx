import style from './index.module.sass'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./layouts/navbar.jsx";
import Login from "./pages/login/Login.jsx";
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import NewPassword from './pages/newPassword/NewPassword';
import Products from './pages/products/Products';
import Home from './pages/home/Home';
import Manager from './pages/manager/Manager';
import { UserProvider } from './context/user.context';

function App() {
  return (
      <UserProvider>
        <BrowserRouter >
          <div className={style.App}>
          <NavBar />
            <Routes>
              <Route extract path='/login' element={<Login />} />
              <Route extract path='/register' element={<Register />} />
              <Route extract path='/forgotpassword' element={<ForgotPassword />} />
              <Route extract path='/newpassword' element={<NewPassword />} />

              <Route extract path='/' element={<Home />} />
              <Route extract path='/customer' element={<Products />} />
              <Route extract path='/manager' element={<Manager />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserProvider>
  );
}

export default App;
