import React, {useContext, useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import PizzaContext from "../../context/pizzaContext"

const Profile = ({ open }) => {
    const [ credentials, setCredentials ] = useState({ _id: "", name: "", email: "" })
    const { users } = useContext(PizzaContext)
    // console.log(users)

    const handleChange = (e) =>{
        setCredentials({ ...credentials, [ e.target.name ] : e.target.value })
    }

    useEffect(() => {
        // Set the credentials state based on the users context
        if (users) {
          setCredentials({
            _id: users._id || '',
            name: users.name || '',
            email: users.email || '',
          });
        }
      }, [users]);
      
    return (
        <div>
            <button type="button" ref={open} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#modal">
                Launch demo modal
            </button>


            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">User Profile</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <div className="mb-3">
                                    <label style={{ fontSize: "1.2rem", fontWeight: 300 }} htmlFor='id'>User Id</label>
                                    <input style={{ padding: 15, borderBottom: "2px solid black", borderRight: "transparent", borderLeft: "transparent", borderTop: "transparent", fontSize: "1rem", fontWeight: "bold"  }} type="text" className="form-control" id="id" aria-describedby="emailHelp" onChange={handleChange} value={credentials._id} />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: "1.2rem", fontWeight: 300 }} htmlFor='name'>User Name</label>
                                    <input style={{ padding: 15, borderBottom: "2px solid black", borderRight: "transparent", borderLeft: "transparent", borderTop: "transparent", fontSize: "1rem" , fontWeight: "bold" }} type="text" className="form-control box" id="name" onChange={handleChange} value={credentials.name} />
                                </div>
                                <div className="mb-3">
                                    <label style={{ fontSize: "1.2rem", fontWeight: 300 }} htmlFor='email'>User Email</label>
                                    <input style={{ padding: 15, borderBottom: "2px solid black", borderRight: "transparent", borderLeft: "transparent", borderTop: "transparent", fontSize: "1rem" , fontWeight: "bold" }} type="text" className="form-control box" id="email" onChange={handleChange} value={credentials.email} />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <Link to="/cart" type="button" style={{ backgroundColor: "#bf8d3c", color: "#fff" }} className="btn">Cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile