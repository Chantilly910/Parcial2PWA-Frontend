import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  render() {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    return (
      <nav>
        {user ? (
          <>
            <NavLink to="/posts" activeClassName="active">Posts</NavLink>
            <NavLink to="/users" activeClassName="active">Usuarios</NavLink>
            <button onClick={this.handleLogout} style={{ marginLeft: 16 }}>Salir</button>
          </>
        ) : (
          <span>Parcial 2 PWA</span>
        )}
      </nav>
    );
  }
}

export default Navbar;