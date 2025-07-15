import React, { Component } from 'react';
import axios from '@/utils/api';
import { Navigate } from 'react-router-dom';

export default class PostForm extends Component {
  state = { title: '', content: '', redirect: false, error: '' };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    try {
      await axios.post('/posts', {
        title: this.state.title,
        content: this.state.content,
        author: user._id,
      });
      this.setState({ redirect: true });
    } catch {
      this.setState({ error: 'Error creando post' });
    }
  };

  render() {
    if (this.state.redirect) return <Navigate to="/posts" />;
    return (
      <div>
        <h2>Crear Post</h2>
        {this.state.error && <p style={{color:'red'}}>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input name="title" placeholder="Título" onChange={this.handleChange} required />
          <textarea name="content" placeholder="Contenido" onChange={this.handleChange} required />
          <button type="submit">Crear</button>
        </form>
      </div>
    );
  }
}
