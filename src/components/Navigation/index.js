import { Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import app from "../../utils/firebaseUtils";

export default function Navigation() {
  let history = useHistory();

  async function logout() {
    await app.auth().signOut();

    if (history) {
      history.push("/signin");
    }
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Home</Link>
      </Navbar.Brand>
      <Navbar.Brand>
        <Link to="/categorias">Categorias</Link>
      </Navbar.Brand>
      <Navbar.Brand>
        <Link to="/produtos">Produtos</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a href="javascrip:void(0);" onClick={logout}>
            {/* <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" /> */}
            Sair
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
