import React from 'react'
import { Link } from "react-router-dom"
import "../../../styles/paymentSuccess.scss"
 
const PaymentSuccess = () => {
  return (
<section className="paymentsuccess" style={{ marginTop: "4rem" }}>
      <main>
        <h1>Order Confirmed</h1>
        <p>Order Placed Successfully, You can check order status below</p>
        <Link style={{ textDecoration: "none" }} to="/orders">Check Status</Link>
      </main>
    </section>  )
}

export default PaymentSuccess