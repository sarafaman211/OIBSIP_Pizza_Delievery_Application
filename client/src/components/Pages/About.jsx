import React from 'react'
import { RiFindReplaceLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import me from "../../config/me.jpg"
import "../../styles/about.scss"

const About = () => {
  return (
    <>
     <section className="about">
      <main>
        <h1>About Us</h1>

        <article>
          <h4>Pizza_Wala</h4>
          <p>
            We are Pizza_Wala. The place for most tasty Pizzas on the
            enitre earth.
          </p>

          <p>
            Explore the various type of food and burgers. Click below to see the
            menu
          </p>

          <Link to="/home">
            <RiFindReplaceLine />
          </Link>
        </article>

        <div>
          <h2>Founder</h2>
          <article>
            <div>
              <img src={me}  alt="Founder" />
              <h3 className='text-center'>Aman Saraf</h3>
            </div>

            <p>
              I am Aman Saraf, the founder of Pizza_Wala. Affiliated to
              God Taste...
            </p>
          </article>
        </div>
      </main>
    </section>
    </>
  )
}

export default About