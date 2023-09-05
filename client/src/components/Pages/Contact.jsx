import React, { useState } from 'react'
import { FaRoad } from "react-icons/fa"
import { BsFillTelephoneFill } from "react-icons/bs"
import { AiFillMail } from "react-icons/ai"
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
    const [credentials, setCredentials] = useState({ firstName: "", lastName: "", phone: "", email: "", message: "" })
    const { firstName, lastName, phone, email, message } = credentials

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!firstName || !lastName || !email || !phone || !message) {
            return toast.error("fill the credentials", {
                duration: 3000,
                position: 'top-right'
            })
        } else {
            await fetch("http://localhost:5000/api/contact/addContacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, phone, email, message })
            })
            toast.success("Thank you for your response !!!", {
                duration: 3000,
                position: 'top-right'
            })
            setCredentials({ firstName: "", lastName: "", email: "", phone: "", message: "" })
        }

    }
    return (
        <>
            <div style={{ backgroundColor: "#bf8d3c" }}>
                <div style={{ marginTop: "4rem" }} className='container'>
                    <div className="wrapper animated bounceInLeft">
                        <div className="company-info" >
                            <h3>Pizza Application</h3>
                            <ul>
                                <li><FaRoad /> 44 Something st</li>
                                <li><BsFillTelephoneFill /> (555) 555-5555</li>
                                <li><AiFillMail /> pizza@company.com</li>
                            </ul>
                        </div>
                        <div className="contact">
                            <h3>Email Us</h3>
                            <form onSubmit={handleSubmit} >
                                <p>
                                    <label>First Name</label>
                                    <input type="text" name="firstName" id="firstName" onChange={handleChange} value={firstName} />
                                </p>
                                <p>
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" id="lastName" onChange={handleChange} value={lastName} />
                                </p>
                                <p>
                                    <label>Email Address</label>
                                    <input type="email" name="email" id="email" onChange={handleChange} value={email} />
                                </p>
                                <p>
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" id="phone" onChange={handleChange} value={phone} />
                                </p>
                                <p className="full">
                                    <label>Message</label>
                                    <textarea name="message" id="message" rows="5" onChange={handleChange} value={message}></textarea>
                                </p>
                                <p className="full">
                                    <button type="submit">Submit</button>
                                </p>
                                <Toaster toastOptions={{
                                    style: {
                                        marginTop: '3.5rem', 
                                    },
                                }} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact