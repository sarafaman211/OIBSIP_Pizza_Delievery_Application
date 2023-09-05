import React, { useState } from 'react'
import forgot from "../../config/forgot.jpg"
import toast, { Toaster } from "react-hot-toast"

const Forogt_Password = () => {
  const [email, setEmail] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await fetch("http://localhost:5000/api/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })

      const res = await data.json()
      toast.success(res.message, {
        duration: 3000,
        position: 'top-right'
      })
      setEmail("")
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
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#103cbe", padding: "2rem 0" }}>
            <div className="featured-image mb-3">
              <img src={forgot} style={{ width: "250px" }} className='image-fluid' alt="Pizza Margherita" />
            </div>
            <p className="text-white fs-2" style={{ fontWeight: "600" }}>Be Verified</p>
            <small className="text-white text-wrap text-center" style={{ width: "17rem", fontfamily: "'Courier New', Courier, monospace" }}>Welcome to the Pizza_Wala </small>
          </div>

          <div className="col-md-6 right-box">
            <form onSubmit={handleSubmit} className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Forgot Your Password</h2>
                <p>Enter Your Email Address</p>
              </div>
              <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" onChange={handleChange} value={email} id='email' name='email' />
              </div>
              <div className="header-text mb-4">
                <h2>Note:</h2>
                <p>Forget your password no problem just enter your email address verfify your acoount and change the password.</p>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-lg btn-primary w-100 fs-6">Continue</button>
              </div>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Forogt_Password