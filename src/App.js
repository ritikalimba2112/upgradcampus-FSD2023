import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Routes, Route, Link } from "react-router-dom"
import NavBar from './components/NavigationBar/NavBar';
import Stack from '@mui/material/Stack';

import LogInPage from './screens/LogInPage';
import SignUpPage from './screens/SignUpPage';
import ProductDetailPage from './screens/ProductDetail';
import ProductHome from './screens/ProductHome';
import OrderPage from './screens/OrderPage';
import IsolatedTest from './screens/IsolatedTest';
import ProductModForm from './screens/ProductMod';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Stack direction={'column'}>
      <ToastContainer />
      <NavBar />
      <Box className="main-content">
        <Routes>
          <Route exact path="/">
            <Route index element={<ProductHome />} />
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>
          <Route path="order">
            <Route index element={<OrderPage />} />
          </Route>
          <Route path="login" element={<LogInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="test" element={<IsolatedTest />} />
          <Route path="addproduct" element={<ProductModForm />} />
          <Route path="edit/:id" element={<ProductModForm />} />
        </Routes>
      </Box>
    </Stack>
  );
}

export default App;
