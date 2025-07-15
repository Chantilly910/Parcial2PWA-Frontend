import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Posts from '../pages/Posts';
import PostForm from '../pages/PostForm';
import PostDetail from '../pages/PostDetail';
import UserList from '../pages/Users';
import Navbar from '../components/NavBar';

export default class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
