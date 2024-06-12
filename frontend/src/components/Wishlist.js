import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Wishlist = () => {
  let obj=useContext(Ct)
    let [data,setData]=useState([])
    let [f,setF]=useState(true)
    let navigate=useNavigate()

    useEffect(()=>{
      if(obj.data.token==""){
        navigate("/")
      }
      else{
        axios.get(`http://localhost:5000/getwish/${obj.data._id}`).then((res)=>{
          setData(res.data)
        })
      }

    },[f])

    let move=(item)=>{
      let data={"pid":item._id,"pimg":item.pimg,"name":item.name,"desc":item.desc,"price":item.price,"cat":item.cat,"qty":1,"uid":obj.data._id}
      axios.post("http://localhost:5000/addtocart",data).then(()=>{
          navigate("/cart")
      })
    }

    let del=(wid)=>{
      axios.delete(`http://localhost:5000/delwish/${wid}`).then((res)=>{
        setF(!f)
      })
    }

  return (<>
    {data.length==0 && <div>empty!</div>}
    {data.length>0 && <div className='homecon'>
          {
            data.map((item)=>{
              return(
                <div className='prodcon'>
                      <div className='img'>
                      <img src={`http://localhost:5000/pimgs/${item.pimg}`}/></div>
                      <p>{item.name}</p>
                      <p>{item.desc}</p>
                      <p>{item.price}</p>
                      <div className='b1'><button onClick={()=>del(item._id)}>Remove</button> 
                      <button onClick={()=>move(item)}>Move to Cart</button></div>
                             
                  </div>
              )
            })
          }
          
      </div>
  }
      </>
  )
}

export default Wishlist