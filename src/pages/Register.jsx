
import React,{useState} from 'react';
import API from '../services/api';
import {toast} from 'react-toastify';
import {Link,useNavigate} from 'react-router-dom';

export default function Register(){
 const[name,setName]=useState('');
 const[phone,setPhone]=useState('');
 const[pass,setPass]=useState('');
 const nav=useNavigate();

 const submit=async(e)=>{
  e.preventDefault();
  try{
   await API.post('/api/auth/register',{name,phoneNumber:phone,password:pass});
   toast.success("Account created");
   nav("/login");
  }catch(err){ toast.error("Registration failed"); }
 }

 return(
  <div className="flex justify-center items-center min-h-screen p-4">
   <div className="card max-w-md w-full">
    <h2 className="text-2xl mb-4 text-center font-semibold">Register</h2>
    <form onSubmit={submit} className="space-y-4">
     <input className="w-full p-3 border rounded" placeholder="Full Name"
        value={name} onChange={e=>setName(e.target.value)}/>
     <input className="w-full p-3 border rounded" placeholder="Phone Number"
        value={phone} onChange={e=>setPhone(e.target.value)}/>
     <input className="w-full p-3 border rounded" type="password" placeholder="Password"
        value={pass} onChange={e=>setPass(e.target.value)}/>
     <button className="btn-primary btn w-full">Create Account</button>
    </form>
    <p className="text-center mt-3">Already have account? <Link className="text-teal-600" to="/login">Login</Link></p>
   </div>
  </div>
 );
}
