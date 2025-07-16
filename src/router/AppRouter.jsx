import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Posts from '../pages/Posts';
import PostForm from '../pages/PostForm';
import PostDetail from '../pages/PostDetail';
import Users from '../pages/Users';
import Navbar from '../components/Navbar';

export default class AppRouter extends Component {
  render() {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;

    return (
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route 
              path="/posts" 
              element={user ? <Posts /> : <Navigate to="/register" />} 
            />
            <Route 
              path="/posts/new" 
              element={user ? <PostForm /> : <Navigate to="/register" />} 
            />
            <Route 
              path="/posts/:id" 
              element={user ? <PostDetail /> : <Navigate to="/register" />} 
            />
            <Route 
              path="/users" 
              element={user ? <Users /> : <Navigate to="/register" />} 
            />
            <Route path="*" element={<Navigate to={user ? "/posts" : "/register"} />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}