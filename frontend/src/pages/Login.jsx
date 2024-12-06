import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useSigninForm } from "../services/useSigninForm";
import { useSetting } from "../context/WebsiteSetting";
const Login = () => {
  const { userDetail, handleChange, handleSubmit } = useSigninForm();
  const navigate = useNavigate();
  const { siteSetting } = useSetting();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <>
      <div className="login_page">
        <div className="back_page_btn">
          <span onClick={() => goBack()}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </span>
        </div>
        <div className="login_container">
          <div className="login_left">
            <div className="login_logo">
              <Link to="/">{siteSetting?.siteName}</Link>
            </div>
            <div className="login_details">
              <form onSubmit={handleSubmit} method="post">
                <h1>
                  Login to{" "}
                  <span className="brand_name">{siteSetting?.siteName}</span>
                </h1>
                {/* <button className="google_btn">
                  <i className="fa-brands fa-google"></i>
                  <span>Signin with Google</span>
                </button> */}
                {/* <div className="bottom_line">
                  <div className="line"></div>
                  <span>or</span>
                  <div className="line"></div>
                </div> */}
                <p className="short_text">
                  Enter email and password to logged in
                </p>
                <div className="email_box box">
                  <label htmlFor="email">Email</label>
                  <div className="field">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      value={userDetail.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="password_box box">
                  <label htmlFor="password">Password</label>
                  <div className="field">
                    <i className="fa-solid fa-key"></i>
                    <input
                      type="password"
                      name="password"
                      value={userDetail.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="forget_pass">
                  <p>
                    <Link to="/forgetpassword"> forget password?</Link>
                  </p>
                </div>
                <button className="login_btn">Sign in</button>
              </form>
              <div className="dont_account">
                <p>
                  "Don't have an account
                  <span>
                    <Link to="/signup"> Signup here</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="login_right"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
