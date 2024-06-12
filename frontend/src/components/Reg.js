import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reg = () => {
  let [data,setData]=useState({})
  let[err,setErr]=useState("")
  let navigate=useNavigate()

  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let reg=()=>{
    axios.post("http://localhost:5000/reg",data).then((res)=>{
      setErr(res.data.err)
    })
  }

  return (
    <div className='con'>
      <div className='form'>
        {err!="" && <div>{err}</div>}
      <input type='text' placeholder='enter email' name='_id' onChange={fun}/>
      <input type='password' placeholder='enter password' name='pwd' onChange={fun}/>
      <input type='text' placeholder='enter name' name='name' onChange={fun}/>
      <input type='text' placeholder='enter phno' name='phno' onChange={fun}/>
      <button onClick={reg}>Register</button>
      </div>
    </div>
  )
}

export default Reg