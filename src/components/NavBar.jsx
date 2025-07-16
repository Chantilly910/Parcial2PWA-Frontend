import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Wrapper para permitir navegación programática en class component
function NavbarWrapper(props) {
  const navigate = useNavigate();
  return <Navbar {...props} navigate={navigate} />;
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout() {
    localStorage.removeItem("user");
    this.props.navigate("/register");
  }
  render() {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    return (
      <nav>
        {user ? (
          <>
            <NavLink to="/posts" className={({isActive}) => isActive ? "active" : ""}>Posts</NavLink>
            <NavLink to="/users" className={({isActive}) => isActive ? "active" : ""}>Usuarios</NavLink>
            <button onClick={this.handleLogout} style={{ marginLeft: 16 }}>Salir</button>
          </>
        ) : (
          <span>Parcial 2 PWA</span>
        )}
      </nav>
    );
  }
}

export default NavbarWrapper;