import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import reset from "../../config/reset.jpg"
import toast, { Toaster } from "react-hot-toast"

const Reset_Password = () => {
  const [data, setData] = useState({ password: "", cf_password: "" })
  const { password, cf_password } = data
  const { authToken } = useParams()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!password || !cf_password){
      toast.error("fill the fields")
    }
    if(password.length <= 5){
      toast.error("Password should be atleat of 5 characters !!!")
    }else{

      try {
        const data = await fetch("http://localhost:5000/api/reset", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken
          },
          body: JSON.stringify({ password })
        })
  
        const res = await data.json()
        toast.success(res.msg)
      } catch (err) {
        toast.error(err.message)
      }
    }
  }

  return (
    <section style={{ backgroundColor: "#bf8d3c" }}>

      <div className="container d-flex justify-content-center align-items-center min-vh-100" >
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#103cbe", padding: "2rem 0" }}>
            <div className="featured-image mb-3">
              <img src={reset} style={{ width: "250px" }} className='image-fluid' alt="Pizza Margherita" />
            </div>
            <p className="text-white fs-2" style={{ fontWeight: "600" }}>Be Verified</p>
            <small className="text-white text-wrap text-center" style={{ width: "17rem", fontfamily: "'Courier New', Courier, monospace" }}>Welcome to the Pizza_Wala </small>
          </div>

          <div className="col-md-6 right-box">
            <form onSubmit={handleSubmit} className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Reset Your Password</h2>
                <p>Enter Your new password here</p>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder=" Enter your password" onChange={handleChange} value={password} id='password' name='password' />
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder=" Confirm password" onChange={handleChange} value={cf_password} id='cf_password' name='cf_password' />
              </div>
              <div className="header-text mb-4">
                <h2>Note:</h2>
                <p>Enter you new Password so it will update user credentials .</p>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-lg btn-primary w-100 fs-6" onClick={handleSubmit}>Submit</button>
              </div>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reset_Password