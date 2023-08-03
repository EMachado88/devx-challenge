import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

interface HeaderProps {
  openLogin: () => void;
  loggedIn: boolean;
  logout: () => void;
}

export function Header(props: HeaderProps) {
  const { openLogin, loggedIn, logout } = props;

  const { pathname } = useLocation();

  return (
    <header>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark text-white">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            XPTO Systems, Ltd
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link${pathname === '/' ? ' active' : ''}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/account"
                  className={`nav-link${loggedIn ? '' : ' disabled'}${pathname === '/account' ? ' active' : ''}`}
                  aria-disabled={loggedIn}
                >
                  Account
                </Link>
              </li>
            </ul>
            {!loggedIn ? (
              <Button variant="primary" onClick={openLogin}>
                Sign in
              </Button>
            ) : (
              <Button variant="primary" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}