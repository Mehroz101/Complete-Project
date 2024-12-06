import React from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignupForm } from "../services/useSignupForm";
import { notifyPromise } from "../services/errorHandlerService";
import { useSetting } from "../context/WebsiteSetting";

const Signup = () => {
  const { userDetail, handleChange, handleSubmit } = useSignupForm();
  const { siteSetting } = useSetting();

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   const promise = handleSubmit(e); // handleSubmit returns a promise

  //   notifyPromise(promise, {
  //     pending: "Signing up...",
  //     success: "Signup Successfully",
  //     error: "Failed to signup!",
  //   });
  // };
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <>
      <div className="login_page signup_page">
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
              <form onSubmit={handleSubmit}>
                <h1>
                  Create an <span className="brand_name">Account</span>
                </h1>
                {/* <button className="google_btn">
                  <i className="fa-brands fa-google"></i>
                  <span>Sign in with Google</span>
                </button>
                <div className="bottom_line">
                  <div className="line"></div>
                  <span>or</span>
                  <div className="line"></div>
                </div> */}
                <p className="short_text">
                  Enter email and password to create an account
                </p>
                <div className="email_box box">
                  <label htmlFor="email">Email</label>
                  <div className="field">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={userDetail.email}
                      onChange={handleChange}
                      required
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
                      placeholder="Password"
                      value={userDetail.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="password_box box">
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <div className="field">
                    <i className="fa-solid fa-key"></i>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={userDetail.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="login_btn">
                  Sign up
                </button>
              </form>
              <div className="dont_account">
                <p>
                  "Do you have an account
                  <span>
                    <Link to="/login"> Sign in here</Link>
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

export default Signup;
