import React, { useContext, useState } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let [data,setData]=useState({})
  let [err,setErr]=useState("")
  let obj=useContext(Ct)
  let navigate=useNavigate()

  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let login=()=>{
    axios.post("http://localhost:5000/login",data).then((res)=>{
      if(res.data.token==undefined){
       setErr(res.data.err)
      }
      else{
        obj.fun(res.data)
        navigate("/")
      }
    })
  }
  return (
    <div className='con'>
      <div className='form'>
          {err!="" && <div>{err}</div>}
          <input type='text' placeholder='enter email' name='_id' onChange={fun} />
          <input type='password' placeholder='enter password' name='pwd' onChange={fun} />
          <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Login