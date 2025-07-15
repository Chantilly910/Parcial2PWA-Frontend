import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav style={{ backgroundColor: '#222', padding: '1rem', color: '#fff' }}>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
          <li><Link to="/posts" style={{ color: '#fff' }}>Posts</Link></li>
          <li><Link to="/posts/new" style={{ color: '#fff' }}>Crear Post</Link></li>
          <li><Link to="/users" style={{ color: '#fff' }}>Usuarios</Link></li>
          <li><Link to="/register" style={{ color: '#fff' }}>Registro</Link></li>
        </ul>
      </nav>
    );
  }
}
