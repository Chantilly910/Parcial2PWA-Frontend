import React, { Component } from 'react';
import { api } from "../api";

export default class Users extends Component {
  state = { users: [], error: '' };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const res = await api.getUsers(); 
      this.setState({ users: res.data.data });
    } catch {
      this.setState({ error: 'Error cargando usuarios' });
    }
  };

  toggleActive = async (id, active) => {
    try {
      await axios.put(`/users/${id}`, { active: !active });
      this.fetchUsers();
    } catch {
      alert('Error actualizando usuario');
    }
  };

  render() {
    const { users, error } = this.state;
    return (
      <div>
        <h2>Usuarios</h2>
        {error && <p style={{ color:'red' }}>{error}</p>}
        {users.map(u => (
          <div key={u._id} style={{border:'1px solid #ccc', padding:'1rem', margin:'0.5rem 0'}}>
            <p><strong>{u.username}</strong> — {u.email}</p>
            <button onClick={() => this.toggleActive(u._id, u.active)}>
              {u.active ? 'Desactivar' : 'Activar'}
            </button>
          </div>
        ))}
      </div>
    );
  }
}
