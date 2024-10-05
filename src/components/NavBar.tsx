import { Link } from "react-router-dom";
import Button from "./Button";
function NavBar() {
  return (
    <header>
      <nav className="nav collapsible">
        <Link className="nav__brand" to="/">
          <img src="src\assets\logo.svg" alt="Oil Change Reminder Logo" />
        </Link>
        <svg className="icon icon--white nav__toggler">
          <use xlinkHref="./assets/sprite.svg#menu"></use>
        </svg>
        <ul className="list nav__list collapsible__content">
          <li className="nav__item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__item">
            <Link to="/Vehicle">My Vehicle</Link>
          </li>
          <li className="nav__item">
            <Link to="/Docs">Docs</Link>
          </li>
          <li className="nav__item">
            <Link to="/signin" className="btn btn--accent">
              Sign In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
