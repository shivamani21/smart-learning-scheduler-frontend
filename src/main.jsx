
import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SubjectDetails from './pages/SubjectDetails';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Protected({children}){ return localStorage.getItem("token")? children:<Navigate to="/login"/> }

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <Routes>
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/" element={<Protected><Dashboard/></Protected>}/>
   <Route path="/subject/:id" element={<Protected><SubjectDetails/></Protected>}/>
  </Routes>
  <ToastContainer position="top-right" autoClose={2200}/>
 </BrowserRouter>
);
