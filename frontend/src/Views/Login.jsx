import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(()=>{
    document.title="Login";
  },[]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const {token}=await response.json();
      // console.log(token)
      localStorage.setItem('token',token)
      // NotificationManager.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      NotificationManager.error("Invalid email or password!");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-6 text-center">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="Login" style={{ width: "80%", height: "auto" }} />
        </div>
        <div className="col-md-6">
          <div className="col-sm-6">
            <h4 className="text-center mb-4">Login Form</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  autoComplete="current"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
            <div>
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            <div>
            <p>Dont't Have an ACcount ? <Link to="/">Register</Link></p>
            </div>
            <div className="text-center my-3">
              <span>OR</span>
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-danger">
                <i className="bi bi-google"></i> Login using Google
              </button>
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-primary">
                <i className="bi bi-facebook"></i> Login using Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Login;
