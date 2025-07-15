import React, { Component } from 'react';
import axios from '../utils/api';
import { Navigate } from 'react-router-dom';

export default class PostDetail extends Component {
  state = { title: '', content: '', loaded: false, redirect: false, error: '' };

  async componentDidMount() {
    const { id } = this.props.params || this.props.match.params;
    try {
      const res = await axios.get(`/posts/${id}`);
      this.setState({ title: res.data.data.title, content: res.data.data.content, loaded: true });
    } catch {
      this.setState({ error: 'Error cargando el post' });
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    const { id } = this.props.params || this.props.match.params;
    try {
      await axios.put(`/posts/${id}`, { title: this.state.title, content: this.state.content });
      this.setState({ redirect: true });
    } catch {
      this.setState({ error: 'Error actualizando post' });
    }
  };

  render() {
    if (this.state.redirect) return <Navigate to="/posts" />;
    if (!this.state.loaded) return <p>Cargando...</p>;
    return (
      <div>
        <h2>Editar Post</h2>
        {this.state.error && <p style={{color:'red'}}>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input name="title" value={this.state.title} onChange={this.handleChange} required />
          <textarea name="content" value={this.state.content} onChange={this.handleChange} required />
          <button type="submit">Actualizar</button>
        </form>
      </div>
    );
  }
}
