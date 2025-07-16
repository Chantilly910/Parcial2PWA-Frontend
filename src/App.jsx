import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import Users from './components/Users';
import Posts from './components/Posts';
import './styles/aero.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Register />} />
        <Route path="register" element={<Register />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/new" element={<PostForm />} />
        <Route path="posts/:id" element={<PostDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<Navigate to="/posts" />} />
      </Route>
    </Routes>
  );
}

export default App;
