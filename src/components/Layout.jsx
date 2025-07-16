import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div style={{ background: 'linear-gradient(to bottom, #e0f7ff, #a0dfff)', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ padding: '2rem' }}>
      <Outlet />
    </main>
  </div>
);

export default Layout;
