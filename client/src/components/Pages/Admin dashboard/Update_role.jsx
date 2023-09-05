import React, { useState } from 'react';
import update from "../../../config/update_role.jpg";
import { useParams } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast"

const Update_role = () => {
  const [role, setRole] = useState(0);
  const { id } = useParams();

  const handleChange = (e) => {
    setRole(Number(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await fetch(`http://localhost:5000/api/updateRole/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ role }),
    });

    const res = await data.json();
    // console.log(res);
    if(res.success){
      toast.success(res.message,{
        duration: 3000,
        position: "top-right"
      })
    }else{
      toast.error(res.message,{
        duration: 3000,
        position: "top-right"
      })
    }
  };

  
  return (
    <section style={{ backgroundColor: "#bf8d3c" }}>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#103cbe", padding: "2rem 0" }}>
            <div className="featured-image mb-3">
              <img src={update} style={{ width: "250px" }} className='image-fluid' alt="Pizza Margherita" />
            </div>
            <p className="text-white fs-2" style={{ fontWeight: "600" }}>Update Role</p>
            <small className="text-white text-wrap text-center" style={{ width: "17rem", fontFamily: "'Courier New', Courier, monospace" }}>Welcome to Pizza_Wala</small>
          </div>

          <div className="col-md-6 right-box">
            <form onSubmit={handleSubmit} className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Hello, Again</h2>
                <p>We are happy to have you back.</p>
              </div>
              <div className="form-group mb-3">
                <label>Select Role:</label>
                <div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="roleUser"
                      name="role"
                      value="0"
                      className="form-check-input"
                      checked={role === 0}
                      onChange={handleChange}
                    />
                    <label htmlFor="roleUser" className="form-check-label">User</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="roleAdmin"
                      name="role"
                      value="1"
                      className="form-check-input"
                      checked={role === 1}
                      onChange={handleChange}
                    />
                    <label htmlFor="roleAdmin" className="form-check-label">Admin</label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Update Role</button>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
    </section>
  );
};

export default Update_role;
