import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {isAuth ? <li>
            ''
          </li> : <Link to="/login">Login</Link>}
          
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;