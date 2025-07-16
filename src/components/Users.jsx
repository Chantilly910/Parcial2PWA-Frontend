import React from "react";
import { api } from "../api";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: "",
      loading: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.setState({ loading: true });
    api.getUsers()
      .then((res) => {
        this.setState({ users: res.data.data, loading: false });
      })
      .catch(() => {
        this.setState({ error: "Error al cargar usuarios", loading: false });
      });
  }

  handleToggle(id) {
    api.toggleUser(id)
      .then(() => this.refresh())
      .catch(() => alert("No se pudo cambiar el estado"));
  }

  render() {
    return (
      <div>
        <h2>Usuarios</h2>
        {this.state.loading && <p>Cargando...</p>}
        <div>
          {this.state.users.map((u) => (
            <div key={u._id} className="card">
              <div>
                <b>{u.username}</b> ({u.email}) 
                <span style={{marginLeft:16}}>Estado: {u.active ? "Activo" : "Inactivo"}</span>
                <button onClick={() => this.handleToggle(u._id)} style={{marginLeft:16}}>
                  {u.active ? "Desactivar" : "Activar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Users;