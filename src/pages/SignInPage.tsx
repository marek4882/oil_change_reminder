import { GoogleLogo } from "@phosphor-icons/react";
import { Route } from "react-router-dom";
import SignUpPage from "./SignUpPage";
function SignInPage() {
  return (
    <section className="form-container">
      <picture className="hero__image-container">
        <img
          className="hero__image"
          src="src/assets/signinsignupimage.svg"
          alt=""
        />
      </picture>
      <form className="form-signin">
        <h1>Sign In</h1>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="login"
            placeholder="Login"
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
        <div className="btn btn--outline grid grid--1x2">
          <GoogleLogo size={32} /> <a>Sign In by Google</a>
        </div>

        <p className="muted">Copyright &copy; 2024</p>
        <p className="signup-message">Don't have an account? </p>
      </form>
    </section>
  );
}

export default SignInPage;
