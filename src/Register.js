import axios from 'axios'
import React, { useState } from 'react'

function Register() {
   var [user,setUser]=useState({uname:"",uid:"",email:"",place:"",
   phoneNumber:"",password:""})
  var submitHandler=()=>{
    axios.post('http://localhost:5000/user/register',user)
    .then((u)=>{
      console.log(u.data);

    })
    .catch(()=>{
      console.log("user not created");
    })

  }

  var inputHandler=(e)=>{
    e.preventDefault();
    setUser((data)=>({...data,[e.target.name]:e.target.value})

    )
  }
    return (
    <div>
      <form >
      userId:<input type='number'name='uid'value={user.uid}onChange={inputHandler}></input>
      Name:<input type="text"name='uname'value={user.uname}onChange={inputHandler}></input>
      email:<input type='email'name='email'value={user.email}onChange={inputHandler}></input>
      place:<input type='text'name='place'value={user.place}onChange={inputHandler}></input>
      password:<input type='password'name='password'value={user.password}onChange={inputHandler}></input>
      PhoneNumber:<input type='number'name='phoneNumber'value={user.phoneNumber}onChange={inputHandler}></input>
      <input type='submit'value="register"onClick={submitHandler}></input>
      </form>
    </div>
  )
}

export default Register