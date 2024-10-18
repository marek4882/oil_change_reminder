import { GoogleLogo } from "@phosphor-icons/react";
import { Link, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage";
function SignInPage() {
  return (
    <section className="block grid grid--1x2">
      <picture className="hero__image-container">
        <img className="hero__image" src="src\assets\hero_images.svg" alt="" />
      </picture>
      <form className="form-signin ">
        <h2>Sign In</h2>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            maxLength={255}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            maxLength={255}
            required
          />
        </div>
        <button className="btn btn--accent btn--form" type="submit">
          Sign in
        </button>

        <p className="muted">Copyright &copy; 2024</p>
        <p className="signup-message">
          Need to create an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  );
}

export default SignInPage;
