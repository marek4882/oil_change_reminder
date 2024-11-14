import { Link } from "react-router-dom";
import Button from "../components/Button";

function HomePage() {
  return (
    <>
      <section className="block hero">
        <div className="container grid grid--1x2">
          <header className="block__header hero__content">
            <h1 className="block__heading">Welcome To Oil Change Reminder</h1>
            <p className="hero__tagline">
              Welcome to OCR. An app where you don't have to worry when you have
              to change the oil in your vehicle. We'll do it for you!
            </p>

            <Link to="/signin" className="btn btn--accent ">
              Start Now
            </Link>
          </header>
          <picture className="hero__image-container">
            <img
              src="src\assets\hero_images.svg"
              className="hero__image"
              alt="Hero illustration"
            />
          </picture>
        </div>
      </section>
      <div className="block block--dark  hero">
        <header className="block__header">
          <h2>Features</h2>
        </header>
      </div>
      <section className="block">
        <div className="container grid grid--1x2 feature ">
          <div className="feature__content">
            <header className="block__header hero__content">
              <h2 className="block__heading">Reminder</h2>
              <p className="hero__tagline">
                Welcome to OCR. An app where you don't have to worry when you
                have to change the oil in your vehicle. We'll do it for you!
              </p>
            </header>
          </div>
          <picture className="hero__image-container">
            <img
              src="src\assets\reminder-graphic.svg"
              className="feature__image"
              alt="Hero illustration"
            />
          </picture>
        </div>
        <div className="container grid grid--1x2 feature ">
          <div className="feature__content">
            <header className="block__header hero__content">
              <h2 className="block__heading">History Tracking</h2>
              <p className="hero__tagline">
                Welcome to OCR. An app where you don't have to worry when you
                have to change the oil in your vehicle. We'll do it for you!
              </p>
            </header>
          </div>
          <picture className="hero__image-container">
            <img
              src="src\assets\history-tracking.svg"
              className="feature__image"
              alt="Hero illustration"
            />
          </picture>
        </div>
      </section>
      <div className="block block--dark  hero">
        <header className="block__header">
          <h2 className="block__header">See More Features</h2>
          <Link to="/signin" className="btn btn--accent ">
            Start Now
          </Link>
        </header>
      </div>

      <footer className="block  footer">
        <div className="grid footer__sections">
          <section className="footer__section">
            <ul className="list nav__list ">
              <li className="nav__item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav__item">
                <Link to="/Vehicle">My Vehicle</Link>
              </li>
              <li className="nav__item">
                <Link to="/Vehicle">Docs</Link>
              </li>
              <li className="nav__item"></li>
            </ul>
          </section>
          <section className="footer__brand">
            <img src="src\assets\logo.svg" alt="" />
          </section>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
