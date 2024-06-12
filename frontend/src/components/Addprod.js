import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Addprod = () => {
  let [data,setData]=useState({})
  let obj=useContext(Ct)
  let navigate=useNavigate()


  useEffect(()=>{
    if(obj.data.token=="" || obj.data.role!="admin"){
      navigate("/login")
    }
  })
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let fun1=(e)=>{
    setData({...data,"pimg":e.target.files[0]})
  }

  let add=()=>{
    let fd=new FormData()
    for(let p in data)
    {
      fd.append(p,data[p])
    }
    axios.post("http://localhost:5000/addprod",fd).then(()=>{
      navigate("/")
    })
  }

  return (
    <div className='con'>
      <div className='form'>
      <input type='text' placeholder='enter name' name='name' onChange={fun}/>
      <input type='text' placeholder='enter desc' name='desc' onChange={fun}/>
      <input type='text' placeholder='enter price' name='price' onChange={fun}/>
      <input type='text' placeholder='enter cat' name='cat' onChange={fun}/>
      <input type='text' placeholder='enter gender' name='gen' onChange={fun}/>
      <input type='file' name='pimg' onChange={fun1}/>
      <button onClick={add}>Add</button>
      </div>
    </div>
  )
}

export default Addprod