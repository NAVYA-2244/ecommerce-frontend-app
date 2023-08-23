import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserHome from './UserHome';

function Login() {
    var [usr,setusr]=useState({email:"",password:""})
    var navigate=useNavigate()

    var checkUser=(e)=>{
        e.preventDefault();
        console.log(usr);
           axios.post('http://localhost:5000/user/login',usr)
           .then((u)=>{
           console.log(u.data);
           //navigation rauting
           if(u.data=="admin"){
           navigate("/adminHome")
           }
           else if(u.data=="no user found"){
            navigate("/login")
           }
           else{
            navigate("/userHome",{state:u.data})
           }
        })
      }

    var handlechenge=(e)=>{
        setusr((data)=>({...data,[e.target.name]:e.target.value}))
   } 
  return (

    <div>
        <form onSubmit={checkUser}>
            Email:<input type='text'name='email'value={usr.email} onChange={handlechenge}></input>
            Password<input type='text'name='password'value={usr.password} onChange={handlechenge}></input>
            <input type='submit'></input>
            
        </form>
    </div>
  )
}

export default Login