import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginImage from  "../../config/login.jpg"
import toast, { Toaster } from "react-hot-toast"

const Login = () => {
    const location = useNavigate()
    const [ credentials, setCredentials ] = useState({ email: "", password: "" })
    const { email, password } = credentials

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const validateEmail = (email) => {
        // eslint-disable-next-line       
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        toast.dismiss();
        try {
            if(!email || !password){
                toast.error("Fill the correct credentials ", {
                    duration: 3000,
                    position: 'top-right'
                });
            }
            if (!validateEmail(email)) {
                toast.error("Use the appropriate Email",{
                    duration: 3000,
                    position: 'top-right'
                })
            }
            if (password.length <= 5) {
                toast.error("Password Should be atleast of 5 charactor",{
                    duration: 3000,
                    position: 'top-right'
                })

            }else{

                const data = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                })
    
                const res = await data.json()
                // console.log(res)
                if(res.refreshToken){
                    localStorage.setItem("token", res.refreshToken)
                    toast.success(res.message, {
                        duration: 3000,
                        position: 'top-right'
                    })
                    location("/home")
                } else {
                    const errorRes = await data.json();
                    // console.log(errorRes.message)
                    toast.error(errorRes, {
                        duration: 3000,
                        position: 'top-right'
                    });
                }
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
   return (
    <section style={{ backgroundColor: "#bf8d3c" }}>

     <div className="container d-flex justify-content-center align-items-center min-vh-100" >
       <div className="row border rounded-5 p-3 bg-white shadow box-area">
       <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: "#103cbe"}}>
           <div className="featured-image mb-3">
           <img src={ LoginImage } style={{ width: "250px" }} className='image-fluid' alt="Pizza Margherita" /> 
                     </div>
           <p className="text-white fs-2" style={{ fontWeight: "600"}}>Be Verified</p>
           <small className="text-white text-wrap text-center" style={{width: "17rem", fontfamily: "'Courier New', Courier, monospace"}}>Welcome to the Pizza_Wala </small>
       </div> 
        
       <div className="col-md-6 right-box">
          <form onSubmit={handleSubmit} className="row align-items-center">
                <div className="header-text mb-4">
                     <h2>Hello</h2>
                     <p>We are happy to have you back.</p>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" onChange={handleChange} value={email} id='email' name='email' />
                </div>
                <div className="input-group mb-3">
                    <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" onChange={handleChange} value={password} id='password' name='password' />
                </div>
                <div className="input-group mb-5 d-flex justify-content-between">
                    <div className="forgot">
                        <small><Link style={{ textDecoration: "none", fontSize: "bold" }} to="/forgot">Forgot Password?</Link></small>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                </div>
                <div className="row">
                    <small>Don't have account? <Link style={{ textDecoration: "none", fontSize: "bold" }} to="/signup">Sign Up</Link></small>
                </div>
                <Toaster />
          </form>
       </div> 
      </div>
    </div>
    </section>
  )
}

export default Login