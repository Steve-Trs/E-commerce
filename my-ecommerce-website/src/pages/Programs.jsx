import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "../styles/programs.css";
import weigthloss from "../assets/weightloss.png";
import musclegain from "../assets/musclegain.png";
import conditioning from "../assets/conditioning.png";
import persoplan from "../assets/persoplan.png";

export default function Programs() {
  const [isOpen, setIsOpen] = useState({
    opt1: false,
    opt2: false,
    opt3: false,
    opt4: false,
  });

  const handleToggle = (option) => {
    setIsOpen((prevIsOpen) => ({
      ...prevIsOpen,
      [option]: !prevIsOpen[option],
    }));
  };

  return (
    <>
      <section className="prog-intro">
        <div className="intro-title">
          <h1>Transcend your limits!</h1>
          <h3>Choose your path of evolution...</h3>
        </div>

        <div className="prog-options-container">
          <div className="prog-option opt1">
            <h3>weight loss</h3>
            <img src={weigthloss} alt="prog" />
            <p style={{ display: isOpen.opt1 ? "none" : "block" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <button
              type="button"
              className="button"
              onClick={() => handleToggle("opt1")}
            >
              Read More
            </button>
            <p
              className="hidden"
              style={{ display: isOpen.opt1 ? "block" : "none" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              quasi adipisci iure eum a, deserunt expedita exercitationem modi
              hic, quisquam, sapiente fugiat molestias mollitia dolorem? Quidem
              labore illum et hic?
            </p>
          </div>

          <div className="prog-option opt2">
            <h3>muscle gain</h3>
            <img src={musclegain} alt="prog" />
            <p style={{ display: isOpen.opt2 ? "none" : "block" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <button
              type="button"
              className="button"
              onClick={() => handleToggle("opt2")}
            >
              Read More
            </button>
            <p
              className="hidden"
              style={{ display: isOpen.opt2 ? "block" : "none" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              quasi adipisci iure eum a, deserunt expedita exercitationem modi
              hic, quisquam, sapiente fugiat molestias mollitia dolorem? Quidem
              labore illum et hic?
            </p>
          </div>

          <div className="prog-option opt3">
            <h3>conditioning</h3>
            <img src={conditioning} alt="prog" />
            <p style={{ display: isOpen.opt3 ? "none" : "block" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <button
              type="button"
              className="button"
              onClick={() => handleToggle("opt3")}
            >
              Read More
            </button>
            <p
              className="hidden"
              style={{ display: isOpen.opt3 ? "block" : "none" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              quasi adipisci iure eum a, deserunt expedita exercitationem modi
              hic, quisquam, sapiente fugiat molestias mollitia dolorem? Quidem
              labore illum et hic?
            </p>
          </div>

          <div className="prog-option opt4">
            <h3>personnalised</h3>
            <img src={persoplan} alt="prog" />
            <p style={{ display: isOpen.opt4 ? "none" : "block" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <button
              type="button"
              className="button"
              onClick={() => handleToggle("opt4")}
            >
              Read More
            </button>
            <p
              className="hidden"
              style={{ display: isOpen.opt4 ? "block" : "none" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              quasi adipisci iure eum a, deserunt expedita exercitationem modi
              hic, quisquam, sapiente fugiat molestias mollitia dolorem? Quidem
              labore illum et hic?
            </p>
          </div>
        </div>
      </section>
      <section className="get-started">
        <div className="faded-bg-programs"></div>
        <div className="text-get-started">
          <h1>let's get started</h1>
          <NavLink to="/shop">
            <button type="button" className="button">
              Buy Now
            </button>
          </NavLink>
        </div>
      </section>
    </>
  );
}
