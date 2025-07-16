import React from "react";
import { api } from "../api";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", error: "", loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { username, email } = this.state;
    if (!username || !email) {
      this.setState({ error: "Completa todos los campos" });
      return;
    }
    this.setState({ loading: true });
    api.registerUser({ username, email })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        window.location.href = "/posts";
      })
      .catch((err) => {
        this.setState({ error: err.response?.data?.error || "Error al registrar usuario", loading: false });
      });
  }
  render() {
    return (
      <div className="card">
        <h2>Registro</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="Usuario" onChange={this.handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
          <button type="submit" disabled={this.state.loading}>Registrar</button>
        </form>
        {this.state.error && <div className="error">{this.state.error}</div>}
      </div>
    );
  }
}

export default Register;