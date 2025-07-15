
import React, { Component } from 'react';

class UserCard extends Component {
  render() {
    const { user, onToggle } = this.props;
    return (
      <div style={{ border: '1px solid #ccc', margin: '0.5rem', padding: '0.5rem' }}>
        <p>{user.username} ({user.email}) - {user.active ? 'Activo' : 'Inactivo'}</p>
        <button onClick={onToggle}>{user.active ? 'Desactivar' : 'Activar'}</button>
      </div>
    );
  }
}
export default UserCard;
