import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let [cart,setCart]=useState([])
  let [f,setF]=useState(true)
  let [total,setTotal]=useState(0)

  let del=(cid)=>{
    axios.delete(`http://localhost:5000/delcart/${cid}`).then(()=>{
      setF(!f)
    })
  }

  let inc=(cid)=>{
    axios.get(`http://localhost:5000/inc/${cid}`).then(()=>{
      setF(!f)
    })
  }

  let dec=(cid,qty)=>{
    if(qty>1){
    axios.get(`http://localhost:5000/dec/${cid}`).then(()=>{
      setF(!f)
    })
  }
  else{
    del(cid)
  }
  }

  useEffect(()=>{
    if(obj.data.token==""){
      navigate("/")
    }
    else{
    axios.get(`http://localhost:5000/getcart/${obj.data._id}`).then((res)=>{
        setCart(res.data)

        obj.fun({"noofitems":res.data.length})
        let t=0
        for(let i=0;i<res.data.length;i++){
          t=t+res.data[i].qty*res.data[i].price
        }
        setTotal(t)
    })
  }
  },[f])
  return (<>
  {cart.length==0 && <div>Your cart is empty</div>}
  {cart.length>0 && <div className='homecon'>
  <div className='filter'>Total:{total}</div>
        {
          cart.map((item)=>{
            return(
              <div className='prodcon'>
                    <div className='img'>
                    <img src={`http://localhost:5000/pimgs/${item.pimg}`}/></div>
                    <p>{item.name}</p>
                    <p>{item.desc}</p>
                    <p>{item.price}</p>
                    <p>Amount:{item.qty*item.price}</p>
                    <p><button onClick={()=>dec(item._id,item.qty)}>-</button>{item.qty}<button onClick={()=>inc(item._id)}>+</button></p>
                    <button onClick={()=>del(item._id)}>delete</button>
                    
                </div>
            )
          })
        }
        
    </div>
}
    </>
  )
}

export default Cart