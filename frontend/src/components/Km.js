import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'

const Km = () => {
    let obj=useContext(Ct)
    let [data,setData]=useState(obj.data.item)
    let [text,setText]=useState("")

    let fun=(e)=>{
        setText(e.target.value)
    }

    let addcom=()=>{
        axios.put("http://localhost:5000/addcom",{"pid":data._id,"name":obj.data.name,"text":text}).then(()=>{
            setText("")
            axios.get(`http://localhost:5000/getprodbyid/${data._id}`).then((res)=>{
                setData(res.data)
            })
        })
    }
  return (
    <div className='kmcon'>
        <div className='prodcon'>
            <div className='img'>
                <img src={`http://localhost:5000/pimgs/${data.pimg}`}/>
            </div>
            <p>Name:{data.name}</p>
            <p>Desc:{data.desc}</p>
            <p>Price:{data.price}</p>
            <p>Cat:{data.cat}</p>
            <p>Gender:{data.gen}</p>
            <p>Comments<div>
                {
                    data.comm.map((item)=>{
                        return(<div>
                           <p>{item.name}:{item.text}</p>
                        </div>)
                    })
                }
            </div></p>
            
            {
                obj.data.token!="" && <div>
                    <textarea onChange={fun} value={text}></textarea>
                    <button onClick={addcom}>addcom</button>
                </div>
            }
        </div>
        <button><Link to="/">Go back</Link></button>
    </div>
  )
}

export default Km