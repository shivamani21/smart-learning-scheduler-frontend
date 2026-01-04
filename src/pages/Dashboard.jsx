
import React,{useEffect,useState} from 'react';
import API from '../services/api';
import {Link,useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

export default function Dashboard(){
 const[sub,setSub]=useState([]);
 const nav=useNavigate();
 const[show,setShow]=useState(false);
 const[name,setName]=useState('');
 const[date,setDate]=useState('');
 const[time,setTime]=useState('20:00');
 const[topics,setTopics]=useState('');

 useEffect(()=>{ load(); },[]);
 const load=async()=>{ try{ const r=await API.get('/api/subjects'); setSub(r.data); }catch(e){toast.error("Failed");} }

 const add=async()=>{
  try{
   await API.post('/api/subjects',{subjectName:name,startDate:date,startTime:time,topics});
   toast.success("Subject created");
   setShow(false); load();
  }catch(e){ toast.error("Error adding"); }
 }

 const logout=()=>{ localStorage.clear(); nav("/login"); }

 return(
 <div className="p-4 max-w-3xl mx-auto">
  <div className="flex justify-between mb-5">
    <h2 className="text-3xl font-semibold">Your Subjects</h2>
    <div className="flex gap-2">
      <button className="btn-primary btn" onClick={()=>setShow(true)}>+ Add</button>
      <button className="btn bg-red-500 text-white" onClick={logout}>Logout</button>
    </div>
  </div>

  {sub.length===0 ? <div className="card p-4 text-center">No subjects yet</div> :
   <div className="space-y-3">
    {sub.map(s=>
      <div key={s.id} className="card p-4 flex justify-between">
        <div>
          <div className="font-semibold text-lg">{s.subjectName}</div>
        </div>
        <Link to={`/subject/${s.id}`} className="text-teal-600 font-semibold">View →</Link>
      </div>
    )}
   </div>
  }

  {show &&
   <div className="fixed inset-0 bg-black/30 flex justify-center items-center p-4">
    <div className="card max-w-lg w-full">
     <h3 className="text-xl mb-3 font-semibold">Add Subject</h3>
     <div className="space-y-3">
       <input className="w-full p-2 border rounded" placeholder="Subject name"
         value={name} onChange={e=>setName(e.target.value)}/>
       <input className="w-full p-2 border rounded" type="date"
         value={date} onChange={e=>setDate(e.target.value)}/>
       <input className="w-full p-2 border rounded" type="time"
         value={time} onChange={e=>setTime(e.target.value)}/>
       <textarea className="w-full p-2 border rounded" rows="3"
        placeholder="Topics separated by commas"
        value={topics} onChange={e=>setTopics(e.target.value)}></textarea>
     </div>
     <div className="flex justify-end gap-2 mt-4">
       <button className="btn" onClick={()=>setShow(false)}>Cancel</button>
       <button className="btn-primary btn" onClick={add}>Create</button>
     </div>
    </div>
   </div>}
 </div>);
}
