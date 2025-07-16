import React, { Component } from 'react';
import { api } from '../api';
import { Navigate, useParams } from 'react-router-dom';

// Este HOC permite usar params en un class component:
function withParams(Component) {
  return props => {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}

class PostDetail extends Component {
  state = { title: '', content: '', loaded: false, redirect: false, error: '' };

  async componentDidMount() {
    const { id } = this.props.params;
    try {
      // Si tienes api.getPost(id), úsalo directamente:
      if (typeof api.getPost === "function") {
        const res = await api.getPost(id);
        const post = res.data.data;
        this.setState({ title: post.title, content: post.content, loaded: true });
      } else {
        // Si no, busca el post entre todos:
        const res = await api.getPosts();
        const post = res.data.data.find(p => p._id === id);
        if (!post) throw new Error();
        this.setState({ title: post.title, content: post.content, loaded: true });
      }
    } catch {
      this.setState({ error: 'Error cargando el post' });
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    const { id } = this.props.params;
    try {
      await api.editPost(id, { title: this.state.title, content: this.state.content });
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
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input name="title" value={this.state.title} onChange={this.handleChange} required />
          <textarea name="content" value={this.state.content} onChange={this.handleChange} required />
          <button type="submit">Actualizar</button>
        </form>
      </div>
    );
  }
}

export default withParams(PostDetail);