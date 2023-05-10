import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="navBar-Container">
        <div className="Logo">
          <h1>BWSolutino</h1>
        </div>

        <div className="nav-elements">
          <ul>
            <li>
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                pokeapi
              </a>
            </li>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/pokelist">Library</NavLink>
            </li>
            <li>
              <NavLink to="/ph2">PlaceHolder2</NavLink>
            </li>
            <li>
              <NavLink to="/ph3">PlaceHolder3</NavLink>
            </li>
            <li>
              <NavLink to="/ph3">PlaceHolder3</NavLink>
            </li>
            <div className="themeSwitch">
              <label>
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
