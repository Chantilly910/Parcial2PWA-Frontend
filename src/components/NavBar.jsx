import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/aero.css';

function NavbarWrapper(props) {
  const navigate = useNavigate();
  return <Navbar {...props} navigate={navigate} />;
}

class Navbar extends React.Component {
  handleLogout = () => {
    localStorage.removeItem("user");
    this.props.navigate("/register");
  }

  render() {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;

    return (
      <nav style={navStyle}>
        <div style={logoStyle}>🌀 Parcial 2 PWA</div>
        {user ? (
          <div style={linkContainerStyle}>
            <NavLink to="/posts" style={linkStyle} className={({ isActive }) => isActive ? "active" : ""}>Posts</NavLink>
            <NavLink to="/users" style={linkStyle} className={({ isActive }) => isActive ? "active" : ""}>Usuarios</NavLink>
            <button onClick={this.handleLogout} className="aero-button">Salir</button>
          </div>
        ) : (
          <div style={linkContainerStyle}>
            <NavLink to="/register" className="aero-button">Crear usuario</NavLink>
            <NavLink to="/posts" className="aero-button">Ver posts</NavLink>
            <NavLink to="/users" className="aero-button">Ver usuarios</NavLink>
          </div>
        )}
      </nav>
    );
  }
}

export default NavbarWrapper;

// 🎨 Estilos Aero en JS
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  background: 'linear-gradient(to right, #e0f7ff, #a0dfff)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  borderRadius: '0 0 16px 16px',
  backdropFilter: 'blur(6px)',
  position: 'sticky',
  top: 0,
  zIndex: 10
};

const logoStyle = {
  fontFamily: 'Segoe UI, sans-serif',
  fontWeight: 'bold',
  fontSize: '1.4rem',
  color: '#004466',
  textShadow: '0 1px 3px rgba(0,0,0,0.2)'
};

const linkContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#004466',
  fontWeight: '600',
  padding: '0.4rem 0.8rem',
  borderRadius: '8px',
  backgroundColor: 'rgba(255,255,255,0.3)',
  transition: 'background-color 0.3s ease',
};

