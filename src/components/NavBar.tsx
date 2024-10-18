import { useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  useEffect(() => {
    const collapsibles = document.querySelectorAll<HTMLElement>(".collapsible");

    collapsibles.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("collapsible--expanded");
      });
    });

    return () => {
      collapsibles.forEach((item) => {
        item.removeEventListener("click", () => {
          item.classList.toggle("collapsible--expanded");
        });
      });
    };
  }, []);

  return (
    <header className="art">
      <nav className="nav collapsible">
        <Link className="nav__brand" to="/">
          <img src="src/assets/logo.svg" alt="Oil Change Reminder Logo" />
        </Link>
        <svg className="icon icon--black nav__toggler">
          <use xlinkHref="src\assets\sprite.svg#menu"></use>
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
