
import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Register extends Component {
  state = {
    username: '',
    email: '',
    redirect: false,
    error: ''
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email } = this.state;
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/users', { username, email });
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({ redirect: true });
    } catch (err) {
      this.setState({ error: 'No se pudo registrar' });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/posts" />;
    }
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Registro</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="username" placeholder="Username" onChange={this.handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={this.handleChange} required />
          <button type="submit">Crear usuario</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}
export default Register;
