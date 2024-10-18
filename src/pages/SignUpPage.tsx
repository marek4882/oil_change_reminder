import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <>
      <section className="block grid grid--1x2">
        <picture className="hero__image-container">
          <img
            className="hero__image"
            src="src\assets\hero_images.svg"
            alt="Sign up hero"
          />
        </picture>
        <form className="form-signin">
          <h2>Sign Up</h2>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
              maxLength={255}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="E-mail"
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
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              maxLength={255}
              required
            />
          </div>
          <button className="btn btn--accent btn--form" type="submit">
            Sign Up
          </button>

          <p className="muted">Copyright &copy; 2024</p>
          <p className="signin-message">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default SignUpPage;
