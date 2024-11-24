import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    console.log("Submitted data:", formData);

    const response = await fetch("http://localhost:5112/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Name", data.name);
      // wyslij e-mail powitalny

      navigate("/vehicle");
    } else {
      const errorData = await response.text();
      console.error("Error:", errorData);
    }
  };

  return (
    <section className="block grid grid--1x2">
      <picture className="hero__image-container">
        <img
          className="hero__image"
          src="src/assets/hero_images.svg"
          alt="Sign up hero"
        />
      </picture>
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {message && <p className="error-message">{message}</p>}
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
            value={formData.confirmPassword}
            onChange={handleChange}
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
  );
}

export default SignUpPage;
