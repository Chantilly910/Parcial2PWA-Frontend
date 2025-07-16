import React from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      error: "",
      loading: false,
    };
    this.handleLike = this.handleLike.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.setState({ loading: true });
    api.getPosts()
      .then((response) => {
        this.setState({ posts: response.data.data, loading: false });
      })
      .catch((err) => {
        this.setState({ error: "Error al cargar posts", loading: false });
      });
  }

  handleLike(postId) {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (!user) {
      alert("Debes estar registrado");
      return;
    }
    api.likePost(postId, user._id)
      .then(() => this.refresh())
      .catch(() => alert("No se pudo dar like"));
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <Link to="/posts/new">
          <button>Crear Post</button>
        </Link>
        <div>
          {this.state.loading && <p>Cargando...</p>}
          {this.state.error && <p className="error">{this.state.error}</p>}
          {this.state.posts.map((post) => (
            <div key={post._id} className="card">
              <div>
                <b>{post.title}</b> <span style={{color:"#555"}}>por {post.author}</span>
              </div>
              <div>{post.content}</div>
              <div>
                <span>Likes: {post.likes.length}</span>
                <button onClick={() => this.handleLike(post._id)} style={{marginLeft:8}}>Like</button>
                <Link to={`/posts/${post._id}`} style={{marginLeft:8}}>Ver / Editar</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Posts;