import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { jsPDF } from "jspdf";
import { useLocation } from 'react-router-dom'
//mport product from './product'
import "./cardcss.css"

function UserHome() {
var [products,setProducts]=useState([])
var [cart,setCart]=useState([])
var [cartitems,setCartitems]=useState(false)
var [proditems,setProditems]=useState(true)
var [orderitems,setOrderitems]=useState(false)
var [myorder,setMyorder]=useState([])
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

  var orderproduct=()=>{
    var order={orderId:"",userId:"",numberOfProducts:"",orderAmount:""}
    order.userId=userdata.uid;
    order.numberOfProducts=cart.length;
    order.orderId= Math.trunc((Math.random())*Math.pow(10,6))
    var sum=0
    for(var i=0; i<cart.length;i++){
      sum=sum+cart[i].price
    }
    order.orderAmount=sum;
if(cart.length>0){

  // var doc=new jsPDF()
  // doc.fromHTML(order,20,20)
  // doc.save("order.pdf")
  
      axios.post('http://localhost:5000/user/order',order)
    .then((o)=>{
      console.log("order placed");
      setCart([])
    })
    .catch(()=>{
      console.log("order not placed");
    })
  }
  else{
     console.log("add min one item in the cort to order");
 
    }
  
  //if close
    
  }

  var vieworders=()=>{
    setCartitems(false);
    setProditems(false);
    setOrderitems(!orderitems);
    axios.get(`http://localhost:5000/user/vieworders/${userdata.uid}`)
    .then((v)=>{
      console.log(v.data);
      setMyorder(v.data)
    })
    .catch(()=>{
      console.log("no orders");
    })
  }

  return (
  <div>
    <div>
      <button onClick={()=>{setCart(cart);
            setProditems(false);
            setOrderitems(false);
          setCartitems(!cartitems)
          }}>cart iteams</button>
           <button onClick={vieworders}>My orders</button>
    </div>
     

    {/* {console.log(cart)} */}
    <div> <h1>hiii{userdata.uname}  email:{userdata.email}</h1>
     {/* {console.log(location.state)} */}
      <h1>UserHomeUserHomeUserHomeUserHomeUserHomeUserHomeUserHome</h1></div>
     <div>
        {proditems?products.map((ele,ind)=>{return <div key={ind} className="card pcard"><img src={ele.img} height="100px" width="100px"></img>                        
        <p>product ID:{ele.id}</p><p>product item:{ele.item}</p><p>product brand:{ele.brand}</p>
          <p><button className='btn btn-success'
          onClick={()=>{ cart.push(ele);
         setCart(cart); console.log(cart);}}>add to cart</button></p>
     </div>}):""}


     {(cartitems==false&&orderitems==false)?products.map((ele,ind)=>{return <div key={ind} className="card pcard"><img src={ele.img} height="100px" width="100px"></img>                        
        <p>product ID:{ele.id}</p><p>product item:{ele.item}</p><p>product brand:{ele.brand}</p>
          <p><button className='btn btn-success'
          onClick={()=>{ cart.push(ele);
         setCart(cart); console.log(cart);}}>add to cart</button></p>
     </div>}):""}

     {cartitems? cart.map((ele,ind)=>{return <div key={ind} className="card pcard"><img src={ele.img} height="100px" width="100px"></img>                        
        <p>product ID:{ele.id}</p><p>product item:{ele.item}</p><p>product brand:{ele.brand}</p> 
        <button className='btn btn-danger' onClick={()=>{
          
          cart.splice(ind,1)
          setCart(cart)
        }}>remove cart</button>

      </div>}):""} 

    {cartitems?<button  className="btn btn-warning" onClick={orderproduct}>order now</button>:""} 


    </div>
    { orderitems? myorder.map((ele)=>{return <table className="table" key={ele.orderId}>
  <thead>
    <tr>
      <th scope="col">OrderId</th>
      <th scope="col">numberOfProducts</th>
      <th scope="col">TotalAmount</th>
      <th scope="col">OrderTime</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{ele.orderId}</th>
      <td>{ele.numberOfProducts}</td>
      <td>{ele.orderAmount}</td>
      <td>{ele.orderTime}</td>
    </tr>
    
   
  </tbody>
</table>

    }):""}
    </div>
  )
}

export default UserHome