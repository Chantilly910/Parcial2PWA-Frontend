import React, { Component } from 'react';
import axios from '../utils/api';
import { Link } from 'react-router-dom';

export default class Posts extends Component {
  state = { posts: [], error: '' };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    try {
      const res = await axios.get('/posts');
      this.setState({ posts: res.data.data });
    } catch (err) {
      this.setState({ error: 'Error cargando posts' });
    }
  };

  handleLike = async (postId) => {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    try {
      await axios.put(`/posts/${postId}/like`, { userId: user._id });
      this.fetchPosts();
    } catch {
      alert('Error al dar like');
    }
  };

  render() {
    const { posts, error } = this.state;
    return (
      <div>
        <h2>Posts</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
        {posts.map(p => (
          <div key={p._id} style={{border:'1px solid #ccc', padding:'1rem', margin:'0.5rem 0'}}>
            <Link to={`/posts/${p._id}`}>
              <h3>{p.title}</h3>
            </Link>
            <p>{p.content}</p>
            <button onClick={() => this.handleLike(p._id)}>
              👍 {p.likes?.length || 0}
            </button>
          </div>
        ))}
      </div>
    );
  }
}
