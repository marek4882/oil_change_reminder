import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5112/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Token:", data.accessToken);
        console.log("Refresh Token:", data.refreshToken);

        // Store the token in localStorage or sessionStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Redirect to the vehicle page
        navigate("/vehicle");
      } else {
        setError("Login failed. Please check your email and password.");
        console.error("Login Failed. Response status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred while trying to log in. Please try again.");
    }
  };

  return (
    <section className="block grid grid--1x2">
      <picture className="hero__image-container">
        <img className="hero__image" src="src/assets/hero_images.svg" alt="" />
      </picture>
      <form className="form-signin" onSubmit={handleSignIn}>
        <h2>Sign In</h2>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
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
