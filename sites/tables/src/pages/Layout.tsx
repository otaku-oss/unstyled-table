import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to={'/'}>Home</Link>
        <Link to={'/serverside-pagination'}>Server Side Pagination</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
