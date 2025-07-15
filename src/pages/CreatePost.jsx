
import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class CreatePost extends Component {
  state = { title: '', content: '', redirect: false };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('Debes registrarte');
    await axios.post(import.meta.env.VITE_API_URL + '/posts', {
      authorId: user.id,
      title: this.state.title,
      content: this.state.content
    });
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) return <Navigate to="/posts" />;
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Nuevo Post</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="title" placeholder="Título" onChange={this.handleChange} required />
          <textarea name="content" placeholder="Contenido" onChange={this.handleChange} required />
          <button type="submit">Crear</button>
        </form>
      </div>
    );
  }
}
export default CreatePost;
