import React from 'react'
import { Link } from "react-router-dom"

const SinglePizza = ({ pizza, showModal, closeModal }) => {

  if (!showModal) return null;

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'flex', justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content" style={{ width: "900px", height: "450px" }}>
          <div className="modal-header">
            <h5 className="modal-title">Pizza Info</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="modal-body d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <img src={pizza.image} style={{ width: "85%", marginLeft: "3rem", borderRadius: "10px", height: "290px" }} alt={pizza.name} />
              </div>
              <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.description}</p>
                <div className='d-flex justify-content-around align-items-center'>
                  <div>
                    <span>Small</span><br />
                    <strong>₹{pizza.prices[0].small}</strong>
                  </div>
                  <div>
                    <span>Medium</span><br />
                    <strong>₹{pizza.prices[0].large}</strong>
                  </div>
                  <div>
                    <span>Large</span><br />
                    <strong>₹{pizza.prices[0].large}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
            <Link to="/cart" style={{ backgroundColor: "#bf8d3c", color: "#fff" }} className="btn">Add to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePizza