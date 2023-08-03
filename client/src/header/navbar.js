import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar p-4 navbar-expand-lg navbar-light bg-warning">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                exact
                to="/"
              >
               Forms 
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/add-bank-From"
              >
                Add From
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/all-forms"
              >
                see All Form
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/add-bank"
              >
                Add Bank
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
