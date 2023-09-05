import React from "react";
import { AiFillLinkedin, AiFillYoutube, AiFillGithub } from "react-icons/ai";
import "../../styles/footer.scss"

const Footer = () => {
  return (
    <footer>
      <div>
        <h2>Pizza_Wala</h2>

        <p>We are trying to give you the best taste possible.</p>
        <br />

        <em>We give attention to genuine feedback.</em>

        <strong>All right received @pizzaWala</strong>
      </div>

      <aside>
        <h4>Follow Us</h4>

        <a target="_blank" rel="noreferrer" href="https://youtube.com">
          <AiFillYoutube />
        </a>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/aman-saraf211">
          <AiFillLinkedin />
        </a>
        <a target="_blank" rel="noreferrer" href="https://github.com/sarafaman211">
          <AiFillGithub />
        </a>
      </aside>
    </footer>
  );
};

export default Footer;
