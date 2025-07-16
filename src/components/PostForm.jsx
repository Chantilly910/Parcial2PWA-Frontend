import React from "react";
import { api } from "../api";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", error: "", loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  }

  handleSubmit(e) {
    e.preventDefault();
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (!user) {
      this.setState({ error: "Debes estar registrado" });
      return;
    }
    if (!this.state.title || !this.state.content) {
      this.setState({ error: "Completa todos los campos" });
      return;
    }
    this.setState({ loading: true });
    api.createPost({
      authorId: user._id,
      title: this.state.title,
      content: this.state.content,
    })
      .then(() => {
        window.location.href = "/posts";
      })
      .catch((err) => {
        this.setState({
          error: err.response?.data?.error || "Error al crear post",
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="card">
        <h2>Crear Post</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Título" onChange={this.handleChange} />
          <textarea name="content" placeholder="Contenido" onChange={this.handleChange} />
          <button type="submit" disabled={this.state.loading}>Crear</button>
        </form>
        {this.state.error && <div className="error">{this.state.error}</div>}
      </div>
    );
  }
}

export default PostForm;