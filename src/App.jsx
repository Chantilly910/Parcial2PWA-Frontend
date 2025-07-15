
import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Register from './pages/Register.jsx';
import Posts from './pages/Posts.jsx';
import PostDetail from './pages/PostDetail.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Users from './pages/Users.jsx';

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </>
    );
  }
}

export default App;
