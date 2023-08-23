import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
//mport product from './product'
import "./cardcss.css"

function UserHome() {
var [products,setProducts]=useState([])
var [cart,setCart]=useState([])
 useEffect(()=>{
  axios.get('http://localhost:5000/user/viewproducts')
   .then((v)=>{
   // console.log(v.data);
    setProducts(v.data)
   })
   .catch(()=>{
    console.log("not founded");
   })
   
 })
  var location=useLocation()
  var userdata=location.state;
  // var productdata=()=>{
  //   setProducts()
  // }
  var addtocart=(p)=>{
    cart.push(p)
    setCart(cart)
  }
  return (
  <div>
    {/* {console.log(cart)} */}
<div> <h1>hiii{userdata.uname}  email:{userdata.email}</h1>
     {/* {console.log(location.state)} */}
      <h1>UserHomeUserHomeUserHomeUserHomeUserHomeUserHomeUserHome</h1></div>
     <div>
     {products.map((ele,ind)=>{return <div key={ind} className="card pcard"><img src={ele.img} height="100px" width="100px"></img>                        
        <p>product ID:{ele.id}</p><p>product item:{ele.item}</p><p>product brand:{ele.brand}</p>
          <p><button className='btn btn-success'
          onClick={()=>{ cart.push(ele);
         setCart(cart); console.log(cart);}}>add to cart</button></p>
     </div>})}

    </div>
    </div>
  )
}

export default UserHome