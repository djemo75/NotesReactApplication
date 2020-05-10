import React, { useContext } from 'react';
import { Nav, Navbar, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from 'components/context/authContext';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  if (!user) {
    return null;
  }
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>NoteSystem</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          {user.isAdmin && (
            <Link className="nav-link" to="/users">
              Users
            </Link>
          )}
        </Nav>
        <Form inline>
          <Nav className="nav-link" style={{ color: '#fff' }}>
            <Link className="nav-link" to={`/users/${user.id}`}>
              Welcome {user?.username} ({user?.isAdmin ? 'admin' : 'user'})
            </Link>
          </Nav>
          <Button variant="outline-light" onClick={() => logout(user)}>
            Logout
          </Button>
        </Form>
      </Navbar>
    </>
  );
}

export default NavBar;
