import React, { useState } from 'react'
import { Link } from "react-router-dom"
import SignupImage from "../../config/signup.jpg"
import toast, { Toaster } from "react-hot-toast"

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const { name, email, password } = credentials


    const validateEmail = (email) => {
        // eslint-disable-next-line       
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (!name || !password) {
                toast.error("fill the credentials first",{
                    duration: 3000,
                    position: 'top-right'
                })
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

            }
            else {
                const data = await fetch("http://localhost:5000/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, password })
                })


                if (data.status >= 200 && data.status < 300) {
                    const res = await data.json();
                    // console.log(res.message);
                    toast.success(res.message, {
                        duration: 3000,
                        position: 'top-right'
                    });
                    if(res.success){
                        localStorage.setItem("token", res.authToken)
                    }
                    setCredentials({ name: "", password: "", email: "" });
                } else {
                    const errorRes = await data.json();
                    toast.error(errorRes.message, {
                        duration: 3000,
                        position: 'top-right'
                    });
                }

            }
        } catch (err) {
            toast.error(err.message, {
                duration: 3000,
                position: 'top-right'
            })
        }
    }
    return (
        <section style={{ backgroundColor: "#bf8d3c" }}>

            <div className="container d-flex justify-content-center align-items-center min-vh-100" >
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#103cbe" }}>
                        <div className="featured-image mb-3">
                            <img src={SignupImage} style={{ width: "250px" }} className='image-fluid' alt="Pizza Margherita" />
                        </div>
                        <p className="text-white fs-2" style={{ fontWeight: "600" }}>Be A Member</p>
                        <small className="text-white text-wrap text-center" style={{ width: "17rem", fontfamily: "'Courier New', Courier, monospace" }}>Welcome to the Pizza_Wala SignUp  </small>
                    </div>

                    <div className="col-md-6 right-box">
                        <form onSubmit={handleSubmit} className="row align-items-center">
                            <div className="header-text mb-4">
                                <h2> Namaste !!!</h2>
                                <p>We are happy to get a new Member.</p>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Enter Name" onChange={handleChange} value={name} id='name' name='name' />
                            </div>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Enter Email Address" onChange={handleChange} value={email} id='email' name='email' />
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Enter Password" onChange={handleChange} id='password' name='password' value={password} />
                            </div>
                            <div className="input-group mb-3">
                                <button className="btn btn-lg btn-primary w-100 fs-6">SignUp</button>
                            </div>
                            <div className="row">
                                <small>Already have an Account then <Link style={{ textDecoration: "none", fontSize: "bold" }} to="/login">Login</Link></small>
                            </div>
                            <Toaster toastOptions={{
                                // style: {
                                //     marginTop: '3.5rem',
                                // },
                            }} />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup