import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import axios from 'axios'


const Home = () => {
    let [prod,setProd]=useState([])
    let [f,setF]=useState(true)
    let obj=useContext(Ct)
    let navigate=useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:5000/getprod").then((res)=>{
            setProd(res.data)
        })
    },[f])

    let addfilter=(e)=>{
        axios.get(`http://localhost:5000/getprod/${e.target.value}`).then((res)=>{
         setProd(res.data)
        })
     }

     let gender=(e)=>{
        axios.get(`http://localhost:5000/getbygen/${e.target.value}`).then((res)=>{
         setProd(res.data)
        })
     }

     let sort=(e)=>{
        if(e.target.value=="high to low price"){
        axios.get("http://localhost:5000/sortdesc").then((res)=>{
         setProd(res.data)
        })
     }

        else{
        axios.get("http://localhost:5000/sortasc").then((res)=>{
         setProd(res.data)
        })
     }
    }

    let add=(item)=>{
        if(obj.data.token=="")
        {
           navigate("/login")
        }
        else{
            let data={"pid":item._id,"pimg":item.pimg,"name":item.name,"desc":item.desc,"price":item.price,"cat":item.cat,"qty":1,"uid":obj.data._id}
            axios.post("http://localhost:5000/addtocart",data).then(()=>{
                navigate("/cart")
            })
        }
    }

    let wishlist=(item)=>{
        if(obj.data.token==""){
            navigate("/login")
        }
        else{
            let data={"pid":item._id,"pimg":item.pimg,"name":item.name,"desc":item.desc,"price":item.price,"cat":item.cat,"uid":obj.data._id}
            axios.post("http://localhost:5000/addtowish",data).then(()=>{
                navigate("/wishlist")
            })   
        }
    }

    let km=(item)=>{
        obj.fun({"item":item})
        navigate("/km")
    }

    let edit=(item)=>{
        obj.fun({"item":item})
        navigate("/editprod")
    }

    let deleteprod=(pid,pimg)=>{
        axios.delete(`http://localhost:5000/deleteprod/${pid}/${pimg}`).then(()=>{
          setF(!f)
        })
    }

  return (
    <div className='homecon'>
        <div className='filtercon'>
            <div>
                <select onChange={sort} >
                    <option disabled selected>Sort</option>
                    <option value="high to low price">high to low price</option>
                    <option value="low to high price">low to high price</option>
                </select>
            </div>
            <div>
                <select onChange={gender}>
                    <option disabled selected>Gender</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                </select>
            </div>
            <div>
            <select onChange={addfilter}>
                <option disabled selected>Filter</option>
                <option value="shirts">shirts</option>
                <option value="jeans">jeans</option>
                <option value="kurtas">kurtas</option>
                <option value="">clear filter</option>
            </select>
            </div>
        </div>
        {
        prod.map((item)=>{
            return(
                <div className='prodcon'>
                    <div className='img'>
                    <img src={`http://localhost:5000/pimgs/${item.pimg}`}/></div>
                    <p className='p1'>{item.name}</p>
                    <p className='p2'>{item.desc}</p>
                    <p className='p3'>&#8377; {item.price}</p>
                    <div className='b1'><button onClick={()=>wishlist(item)}>Wishlist</button>
                    <button onClick={()=>add(item)}>Add to Cart</button></div>
                    <button onClick={()=>km(item)}>know more</button>
                    {obj.data.role=="admin" && <button onClick={()=>edit(item)}>Edit</button>}
                    {obj.data.role=="admin" && <button onClick={()=>deleteprod(item._id,item.pimg)}>Delete</button>}
                </div>
            )
        })}

    </div>
  )
}

export default Home