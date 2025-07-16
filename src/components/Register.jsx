import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/aero.css';

class Register extends Component {
  state = {
    username: '',
    email: '',
    redirect: false,
    error: '',
    loading: false
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email } = this.state;

    if (!username.trim() || !email.trim()) {
      this.setState({ error: 'Todos los campos son obligatorios' });
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      const res = await axios.post("http://localhost:4000/api/users", { username, email });
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({ redirect: true });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'No se pudo registrar';
      this.setState({ error: errorMsg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/posts" />;
    }

    return (
      <div style={formContainerStyle}>
        <h2 style={{ color: '#004466' }}>Registro</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            placeholder="Usuario"
            onChange={this.handleChange}
            required
            className="aero-input"
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            onChange={this.handleChange}
            required
            className="aero-input"
          />
          <button type="submit" className="aero-button">
            {this.state.loading ? 'Creando...' : 'Crear usuario'}
          </button>
        </form>
        {this.state.error && <p style={{ color: 'red', marginTop: '1rem' }}>{this.state.error}</p>}
      </div>
    );
  }
}

const formContainerStyle = {
  background: 'rgba(255, 255, 255, 0.8)',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  maxWidth: '400px',
  margin: '2rem auto',
  textAlign: 'center'
};

export default Register;
