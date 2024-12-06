import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForgetForm } from "../services/useForgetForm";
import { notifyPromise } from "../services/errorHandlerService";
import { useSetting } from "../context/WebsiteSetting";
const ForgetPass = () => {
  const navigate = useNavigate();
  const { siteSetting } = useSetting();

  const { handleSubmit, handleChange, userDetail } = useForgetForm();
  const goBack = () => {
    navigate(-1); // This will navigate to the previous page
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const promise = handleSubmit(e); // Assuming handleSubmit returns a promise

    notifyPromise(promise, {
      pending: "Sending mail...",
      success: "Check your email!",
      error: "Failed to send mail!",
    });
  };

  return (
    <>
      <div className="login_page forgetpass_page">
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
              <form onSubmit={handleFormSubmit}>
                <h1>
                  Forget <span className="brand_name">Password</span>
                </h1>

                <p className="short_text">Enter email to forget password</p>
                <div className="email_box box">
                  <label htmlFor="email">Email</label>
                  <div className="field">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      onChange={handleChange}
                      value={userDetail.email}
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <button className="login_btn">Forget Password</button>
              </form>

              <div className="dont_account">
                <p>
                  Do you have an account
                  <span>
                    <Link to="/login"> Signin here</Link>
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

export default ForgetPass;
