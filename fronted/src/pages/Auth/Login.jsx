import "./Login.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navber";
import {
  RegLog,
  loginRequest,
  registerUser,
} from "../../redux/slice/AuthSlice";
const initialValue = {
  email: "",
  password: "",
};
export const Login = () => {
  const [user, setUser] = useState(initialValue);
  const { redirectTo, loading } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  //form validation
  const validation = () => {
    let error = {};
    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = "Enter a valid Email";
    }
    if (!user.password) {
      error.password = "Password is Required";
    }
    return error;
  };
  //onchange validation
  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email is required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "@password is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };

  const SubmitInfo = async (e) => {
    e?.preventDefault();
    let ErrorList = validation();
    setError(ErrorList);
    let data = {
      email: user.email,
      password: user.password,
    };

    try {
      await dispatch(loginRequest(data));
      const role = localStorage.getItem("role");
      if (role === "admin") {
        navigate("/adminpanel");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  //redirect if get the token or not get the token
  const check = () => {
    let token = localStorage.getItem("token");
    let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

    if (token == null || token == undefined || token == "") {
      //  window.location.pathname = getPathname;
      navigate("/login");
    }
  };
  useEffect(() => {
    check();
    registerUser();
    navigate(redirectTo);
  }, [redirectTo]);
  const log = () => {
    dispatch(RegLog());
  };

  return (
    <>
      <Navbar />
      <div className="background1"></div>
      <div className="container1">
        <div className="item1">
          <h1 style={{ color: "white" }}>Golden Wings</h1>
          <div className="text-item">
            <h2 style={{ color: "white" }}>
              Welcome!
              <br />
              <span>To Login Page</span>
            </h2>
            <p>
              Love your morning cup of joe even more by discovering what goes
              into a satisfying brew on a coffee tour. You’ll learn about every
              stage of the production process, from growing to roasting
            </p>
            <div className="social-icon">
              <a class="text-white px-3" href="">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a class="text-white px-3" href="">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="text-white px-3" href="">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a class="text-white px-3" href="">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="text-white pl-3" href="">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="login-section">
          <div className="form-box1 login">
            <form action="">
              <h2>Sign In</h2>
              <div className="input-box1">
                <span className="icon">
                  <i className="fa-regular fa-envelope"></i>
                </span>
                <input
                  type="email"
                  value={user.email}
                  name="email"
                  onChange={(e) => postUserData(e)}
                  placeholder="Enter email"
                />
                <label>Email</label>
                <span style={{ color: "red" }}> {error.email} </span>
              </div>
              <div className="input-box1">
                <span className="icon">
                  <i class="fa-regular fa-lock"></i>
                </span>
                <input
                  type="password"
                  value={user.password}
                  name="password"
                  onChange={(e) => postUserData(e)}
                  placeholder="Enter password"
                />
                <label>Password</label>
                <span style={{ color: "red" }}> {error.password} </span>
              </div>
              <div className="remember-password">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>
              </div>

              <button onClick={SubmitInfo} className="btn1">
                Log in
              </button>

              <div className="create-account">
                <p>
                  Create A New Account?
                  <button onClick={log}>
                    <Link to={"/register"}>Sign up</Link>
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
