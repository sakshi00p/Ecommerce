import React, { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Logout from './components/Logout'
import Home from './components/Home'
import Addprod from './components/Addprod'
import Cart from './components/Cart'
import Ct from './components/Ct'
import Login from './components/Login'
import Nav from './components/Nav'
import Reg from './components/Reg'
import Editprod from './components/Editprod'
import Km from './components/Km'
import Wishlist from './components/Wishlist'

const App = () => {
  let [data,setData]=useState({"token":"","_id":"","name":"","role":"","noofitems":0})
  let fun=(obj)=>{
    setData({...data,...obj})
  }

  let obj={"data":data,"fun":fun}
  return (
    <div>
      <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/reg" element={<Reg/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/addprod" element={<Addprod/>}/>
        <Route path="/editprod" element={<Editprod/>}/>
        <Route path="/km" element={<Km/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
      </Routes>
      </Ct.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App