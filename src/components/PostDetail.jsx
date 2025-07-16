import React from "react";
import { api } from "../api";

class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      title: "",
      content: "",
      error: "",
      loading: false,
      saved: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.loadPost = this.loadPost.bind(this);
  }

  componentDidMount() {
    this.loadPost();
  }

  loadPost() {
    const postId = this.props.match.params.id;
    api.getPosts()
      .then((response) => {
        const post = response.data.data.find((p) => p._id === postId);
        if (post) {
          this.setState({
            post,
            title: post.title,
            content: post.content,
            saved: false
          });
        } else {
          this.setState({ error: "Post no encontrado" });
        }
      })
      .catch(() => this.setState({ error: "Error al cargar post" }));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  }

  handleSave(e) {
    e.preventDefault();
    const { post, title, content } = this.state;
    if (!post) return;
    if (!title || !content) {
      this.setState({ error: "Completa todos los campos" });
      return;
    }
    this.setState({ loading: true });
    api.editPost(post._id, { title, content })
      .then(() => {
        this.setState({ saved: true, loading: false });
        this.loadPost();
      })
      .catch(() => {
        this.setState({ error: "Error al editar post", loading: false });
      });
  }

  render() {
    const { post, title, content, error, loading, saved } = this.state;
    if (error) return <div className="error">{error}</div>;
    if (!post) return <div>Cargando...</div>;
    return (
      <div className="card">
        <h2>Editar Post</h2>
        <form onSubmit={this.handleSave}>
          <input type="text" name="title" value={title} onChange={this.handleChange} />
          <textarea name="content" value={content} onChange={this.handleChange} />
          <button type="submit" disabled={loading}>Guardar</button>
        </form>
        {saved && <span style={{ color: "green" }}>¡Guardado!</span>}
      </div>
    );
  }
}

export default PostDetail;