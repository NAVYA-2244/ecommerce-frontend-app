import axios from 'axios'
import React, { useState } from 'react'
//import products from "./product"
import'./cardcss.css'

function AdminHome() {
  var[users,setUsers]=useState([])
  var [uflag,setUflag]=useState(false)
  var [prds,setPrds]=useState([])
  var [pflag,setPflag]=useState(false)
  var viewuser=()=>{
    setUflag(!uflag)
    setPflag(false)
    axios.get('http://localhost:5000/admin/viewusers')
    .then((u)=>{
      setUsers(u.data)

    })
    .catch(()=>{
      console.log("data not found");
    })
}
var viewproduct=()=>{
  setPflag(!pflag)
  setUflag(false)
  axios.get('http://localhost:5000/user/viewproducts')
  .then((v)=>{
     console.log(v.data);
     setPrds(v.data)
  })
  .catch(()=>{
    console.log("not founded");
  })
  
}
  return (
    <div>
      <h1>AdminHome</h1>
        <button className='btn btn-primary'onClick={viewproduct}>viwproduct</button>
        <button className='btn btn-primary'>addproduct</button>
         <button className='btn btn-primary'onClick={viewuser}>viewusers</button>
         <div>
          {uflag?users.map((ele)=>{return<div><p>Name:{ele.uname}</p>
          <p>place:{ele.place}</p>
          <p>userId:{ele.uid}</p>
          <p>Email:{ele.email}</p>
          </div>
           
          }):""

          }
  
         </div>
         
         <div>
         {pflag? prds.map((ele,ind)=>{return <div key={ind} className="card pcard"><img src={ele.img} height="100px" width="100px"></img>                        
        <p>product ID:{ele.id}</p><p>product item:{ele.item}</p><p>product brand:{ele.brand}</p>
        <p><button className='btn btn-success'>add to cart</button></p>
        </div>}):""}

         </div>
         </div>

  )
}

export default AdminHome