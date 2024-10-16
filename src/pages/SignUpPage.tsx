import { Link } from "react-router-dom";
import { useState } from "react";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Data: ", formData);
    // Submit the form data to a server or backend service
  };

  return (
    <section className="block grid grid--1x2">
      <picture className="hero__image-container">
        <img
          className="hero__image"
          src="src\assets\hero_images.svg"
          alt="Sign up hero"
        />
      </picture>
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            maxLength={255}
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
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
  );
}

export default SignUpPage;
