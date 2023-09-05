import React, { useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { GiFullPizza } from "react-icons/gi"
import { FiLogIn, FiLogOut } from "react-icons/fi"
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import toast, { Toaster } from "react-hot-toast"
import Profile from '../Auth/Profile'

const Navbar = () => {
    const location = useNavigate();

    const logout = () => {
        localStorage.removeItem('token')
        location('/login')
        toast.success("logout Successfull !!!", {
            duration: 3000,
            position: "top-right"
        })
    }

    const ref = useRef(null)

    const updateModal = () => {
        ref.current.click()
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-grey bg-body-tertiary fixed-top" style={{ backgroundColor: "grey", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)" }} >
                <div className="container-fluid" style={{ margin: "0 0.5rem" }}>
                    <Link className="navbar-brand fw-2" to="/"><GiFullPizza className='mx-2 fs-2' style={{ color: "#bf8d3c" }} />Pizza_Application</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} style={{ fontWeight: "bold" }} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/pizza" ? "active" : ""}`} style={{ fontWeight: "bold" }} aria-current="page" to="/pizza">Pizzas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/orders" ? "active" : ""}`} style={{ fontWeight: "bold" }} aria-current="page" to="/orders">MyOrders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} style={{ fontWeight: "bold" }} aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} style={{ fontWeight: "bold" }} aria-current="page" to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                        {localStorage.getItem("token") ? <div className="d-flex">
                            <Link to="/cart" className="btn fs-3" ><AiOutlineShoppingCart /></Link>
                            <button onClick={updateModal} className="btn fs-3" ><AiOutlineUser /></button>
                            <button onClick={logout} className="btn fs-3" type="submit"><FiLogOut /></button>
                        </div> : <Link to="/login" className="btn fs-3" type="submit"><FiLogIn /></Link>}
                    </div>
                    <Toaster />
                </div>
            </nav>
            <Profile open={ref} />

        </>
    )
}

export default Navbar