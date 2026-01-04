
import React,{useState} from 'react';
import API from '../services/api';
import {toast} from 'react-toastify';
import {Link,useNavigate} from 'react-router-dom';

export default function Login(){
 const[phone,setPhone]=useState('');
 const[pass,setPass]=useState('');
 const nav=useNavigate();

 const submit=async(e)=>{
  e.preventDefault();
  try{
   const r=await API.post('/api/auth/login',{phoneNumber:phone,password:pass});
   localStorage.setItem("token",r.data.token);
   toast.success("Logged in");
   nav("/");
  }catch(err){ toast.error("Invalid login"); }
 }

 return(
  <div className="flex justify-center items-center min-h-screen p-4">
   <div className="card max-w-md w-full">
    <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>
    <form onSubmit={submit} className="space-y-4">
     <input className="w-full p-3 border rounded" placeholder="Phone Number"
        value={phone} onChange={e=>setPhone(e.target.value)}/>
     <input className="w-full p-3 border rounded" type="password" placeholder="Password"
        value={pass} onChange={e=>setPass(e.target.value)}/>
     <button className="btn-primary btn w-full">Login</button>
    </form>
    <p className="text-center mt-3">New here? <Link className="text-teal-600" to="/register">Register</Link></p>
   </div>
  </div>
 );
}
