import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import activate from '../../config/activate.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom"

const Activation_Email = () => {
  const { authToken } = useParams();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); // New state to track error

  useEffect(() => {
    if (authToken) {
      const activateEmail = async () => {
        try {
          const data = await fetch('http://localhost:5000/api/emailVerify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authToken }),
          });

          const res = await data.json();
          // console.log(res);
          if(res.msg === "Account activated Enjoy our pizzas !!!"){
            setMessage(res.msg);
            setIsError(false); 
          }else{
            setMessage(res.msg);
            setIsError(true); 
          }
        } catch (err) {
          toast.error(err.message, {
            duration: 3000,
            position: 'top-right',
          });
          setMessage(err.message);
          setIsError(true); 
        }
      };
      activateEmail();
    }
  }, [authToken]);

  return (
    <section style={{ backgroundColor: '#bf8d3c' }}>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: '#103cbe', padding: '2rem 0' }}
          >
            <div className="featured-image mb-3">
              <img
                src={activate}
                style={{ width: '250px' }}
                className="image-fluid"
                alt="Pizza Margherita"
              />
            </div>
            <p className="text-white fs-2" style={{ fontWeight: '600' }}>
              Be Verified
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{ width: '17rem', fontFamily: "'Courier New', Courier, monospace" }}
            >
              Welcome to the Pizza_Wala{' '}
            </small>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Namaste</h2>
                {/* <p style={{ color: isError ? 'red' : 'green' }}>
                  {isError ? 'Error' : 'Success'}
                </p> */}
                <p style={{ color: 'green' }}>
                  Success
                </p>
              </div>
              {/* <strong style={{ color: isError ? 'red' : 'green' }}>{message}</strong> */}
              <strong style={{ color: 'green', marginBottom: '0.9rem' }}>Account Activated</strong>
              <Link className='btn btn-primary' style={{ textDecoration: "none" }} to="/login">Login Now</Link>
            </div>
          </div>
          <Toaster />
        </div>
      </div>
    </section>
  );
};

export default Activation_Email;
