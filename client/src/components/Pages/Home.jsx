import React from 'react'
import "../../styles/home.scss"
import { Link } from "react-router-dom"
import me from "../../config/me.jpg"

const Home = () => {
  return (
    <>
      <section className="home">
        <div>
          <h1>Pizza Wala</h1>
          <p>
            Give yourself a tasty Pizza.
          </p>
        </div>

        <Link style={{ textDecoration: "none" }}
          to="/pizza">
          Explore Menu
        </Link>
      </section>

      <section className="founder">
        <div>
          <img src={me} alt="Founder" height={200} width={200} />
          <h3>Aman Saraf</h3>

          <p>
            Hey, Everyone I am Aman Saraf, the founder of Pizza Wala.
            <br />
            Our aim is to create the most tasty Pizzas on planet.
          </p>
        </div>
      </section>
    </>
  )
}

export default Home