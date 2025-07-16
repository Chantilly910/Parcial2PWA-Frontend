import React, { Component } from "react";
import { api } from "../api";
import { Navigate } from "react-router-dom";

export default class PostForm extends Component {
  state = {
    title: "",
    content: "",
    redirect: false,
    error: ""
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await api.createPost({
        title: this.state.title,
        content: this.state.content,
        author: user._id
      });
      this.setState({ redirect: true });
    } catch (err) {
      this.setState({ error: "No se pudo crear el post" });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/posts" />;
    }
    return (
      <div>
        <h2>Nuevo Post</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="title" placeholder="Título" onChange={this.handleChange} required />
          <textarea name="content" placeholder="Contenido" onChange={this.handleChange} required />
          <button type="submit">Crear</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}