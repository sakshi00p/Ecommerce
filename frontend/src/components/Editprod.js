import React, { useContext, useEffect, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Editprod = () => {
  let obj=useContext(Ct)
  let [data,setData]=useState(obj.data.item)
  let [file,setFile]=useState("")
  let navigate=useNavigate()

  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let fun1=(e)=>{
    setFile(e.target.files[0])
  }

  let update=()=>{
    axios.put("http://localhost:5000/updateprod",data).then(()=>{
        if(file!="")
        {
            let fd=new FormData()
            fd.append("pimg",file)
            fd.append("pid",data._id)
            fd.append("oldimg",data.pimg)
            axios.post("http://localhost:5000/updprodimg",fd).then(()=>{
            })
        }
      navigate("/")
    })
  }

  return (
    <div className='con'>
      <div className='form'>
      <input type='text' placeholder='enter name' name='name' onChange={fun} value={data.name}/>
      <input type='text' placeholder='enter desc' name='desc' onChange={fun} value={data.desc}/>
      <input type='text' placeholder='enter price' name='price' onChange={fun} value={data.price}/>
      <input type='text' placeholder='enter cat' name='cat' onChange={fun} value={data.cat}/>
      <input type='file' name='pimg' onChange={fun1}/>
      <button onClick={update}>Update</button>
      </div>
    </div>
  )
}

export default Editprod