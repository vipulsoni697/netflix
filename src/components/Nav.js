import React, { useState, useEffect } from "react";
import "./Nav.css";
import netflix from "../img/netflix.png";
import avatar from "../img/avatar.png";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={netflix} alt="Netflix Logo" />
      <img className="nav__avatar" src={avatar} alt="Netflix avatar" />
    </div>
  );
}

export default Nav;
