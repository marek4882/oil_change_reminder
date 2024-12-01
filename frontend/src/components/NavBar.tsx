import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

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

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

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
            <Link to="/vehicle">My Vehicle</Link>
          </li>
          <li className="nav__item">
            <Link to="/docs">Docs</Link>
          </li>
          {/* <li className="nav__item">
            <Link to="/crudformpage">CRUD</Link>
          </li> */}

          {isLoggedIn ? (
            <li className="nav__item">
              <Link
                to="/signin"
                className="btn btn--accent"
                onClick={handleLogOut}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li className="nav__item">
              <Link to="/signin" className="btn btn--accent">
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
