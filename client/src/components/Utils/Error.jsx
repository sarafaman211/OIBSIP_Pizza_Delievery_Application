import React from 'react'
import { Link } from "react-router-dom"
import { MdError } from "react-icons/md"
import "../../styles/error.scss"
const Error = () => {
  return (
    <section className="notFound" style={{ marginTop: "4rem" }}>
    <main>
      <div>
        <MdError />
        <h1 style={{ color: "red" }}>Oops</h1>
      </div>

      <p>Page not found, click below to go to home page.</p>
      <Link style={{ textDecoration: "none" }} to="/">Go to Home</Link>
    </main>
  </section>
  )
}

export default Error