import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Register from "./components/Register.jsx";
import Posts from "./components/Posts.jsx";
import PostForm from "./components/PostForm.jsx";
import PostDetail from "./components/PostDetail.jsx";
import Users from "./components/Users.jsx";

class App extends React.Component {
  render() {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    return (
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              {user ? <Redirect to="/posts" /> : <Register />}
            </Route>
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/new" component={PostForm} />
            <Route exact path="/posts/:id" component={PostDetail} />
            <Route exact path="/users" component={Users} />
            <Route path="*">
              <h2>Página no encontrada</h2>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;