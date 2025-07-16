import React, { Component } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  state = { posts: [], error: "" };

  async componentDidMount() {
    try {
      const res = await api.getPosts();
      this.setState({ posts: res.data.data });
    } catch (err) {
      this.setState({ error: "Error cargando los posts" });
    }
  }

  render() {
    const { posts, error } = this.state;
    return (
      <div>
        <h2>Posts</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Link to="/posts/new">
          <button>Nuevo Post</button>
        </Link>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`}>{post.title}</Link>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}