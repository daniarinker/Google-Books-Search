import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
      Google Books Search 
      </a>
      <li class="nav-item">
        <a class="nav-link" href="/">Search</a>
        <a class="nav-link" href="/save">Saved</a>
      </li>
    </nav>
  );
}

export default Nav;
