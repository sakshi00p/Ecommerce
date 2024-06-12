import React, { useContext } from 'react'
import Ct from './Ct'
import { Link } from 'react-router-dom'

const Nav = () => {
    let obj=useContext(Ct)
  return (
    <nav>
        <Link to="/">Home</Link>
        {obj.data.token=="" && <Link to="/login">Login</Link>}
        {obj.data.token=="" && <Link to="/reg">Reg</Link>}
        {obj.data.token!="" && obj.data.role=="user" && <Link to="/cart">Cart<button>{obj.data.noofitems}</button></Link>}
        {obj.data.token!="" && obj.data.role=="user" && <Link to="/wishlist">Wishlist</Link>}
        {obj.data.token!="" && obj.data.role=="admin" && <Link to="/addprod">Addprod</Link>}
        {obj.data.token!="" && <Link to="/logout">Logout</Link>}
        {obj.data.token!="" && <div style={{"color":"white"}}>{obj.data.name}</div>}
    </nav>
  )
}

export default Nav