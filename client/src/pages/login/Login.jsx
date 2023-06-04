import axios from "axios";
import React, { useRef } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      // dispatch({type: "LOGIN_START"});
      // console.log(res);

      dispatch({type: "LOGIN_SUCCESS", payload: res.data});

    } catch (error) {
      dispatch({type: "LOGIN_FAILURE"});

      if (error.response.status === 400) {
        console.log(error);
        alert("Wrong Credentials here");
      }
      if (error.response.status === 500) {
        alert(error.message);
      }
    }
  };
  console.log(isFetching);

  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form action="" className="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input type="email" placeholder="Enter Your Email" ref={emailRef} />

          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            ref={passwordRef}
          />

          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
        </form>

        <NavLink to={"/register"} className="link">
          <button className="loginRegisterButton">Register</button>
        </NavLink>
      </div>
    </>
  );
};

export default Login;
