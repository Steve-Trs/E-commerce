import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/homepage.css";
import prog from "../assets/prog-option.png";
import man from "../assets/man-option.png";
import woman from "../assets/female2-option.png";

export default function HomePage() {
  return (
    <>
      <section className="faded-bg">
        <div className="bg"></div>
        <h1>title</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
        <NavLink to="/shop">
          {" "}
          <button type="button" className="button">
            shop now
          </button>
        </NavLink>
      </section>
      {/* --------------------section options--------------------- */}

      <section className="container-options">
        <div className="option">
          <div className="content">
            {" "}
            <img src={prog} alt="Fitness Programme" />
            <h3>Workout Plans</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
              amet molestiae voluptatum quod itaque modi similique obcaecati
              blanditiis nostrum totam!.
            </p>
          </div>

          <div className="bg-btn">
            <NavLink to="/shop">
              <button type="button" className="button">
                check it out
              </button>
            </NavLink>
          </div>
        </div>
        <div className="option">
          <div className="content">
            <img src={woman} alt="woman" />
            <h3>Woman T-Shirt</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
              amet molestiae voluptatum quod itaque modi similique obcaecati
              blanditiis nostrum totam!.
            </p>
          </div>

          <div className="bg-btn">
            <NavLink to="/shop">
              <button type="button" className="button">
                check it out
              </button>
            </NavLink>
          </div>
        </div>
        <div className="option">
          <div className="content">
            <img src={man} alt="man" />
            <h3>Man T-Shirt</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
              amet molestiae voluptatum quod itaque modi similique obcaecati
              blanditiis nostrum totam!.
            </p>
          </div>

          <div className="bg-btn">
            <NavLink to="/shop">
              <button type="button" className="button">
                check it out
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
