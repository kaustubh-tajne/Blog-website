import axios from "axios";
import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = user;

    if (!username || !email || !password) {
      return alert("Please fill registration form properly");
    }

    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        alert("User Created");
        console.log(res.data);
        navigate('/login');
      }
    } catch (error) {
      if (error.response.status === 409) {
        alert("User already Exits");
      }
      if (error.response.status === 500) {
        alert(error.message);
      }
    }
  };
  return (
    <>
      <div className="register">
        <div>
          <span className="registerTitle">Register</span>
          <form action="" className="registerForm" onSubmit={handleSubmit}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder="Enter Your username"
              value={user.username}
              name="username"
              onChange={handleInput}
            />

            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={user.email}
              name="email"
              onChange={handleInput}
            />

            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
              name="password"
              onChange={handleInput}
            />

            <button type="submit" className="registerButton">
              Register
            </button>
          </form>

          <NavLink to={"/login"} className="link">
            <button className="registerLoginButton">Login</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Register;
