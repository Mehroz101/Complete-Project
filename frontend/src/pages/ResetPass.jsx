import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useResetForm } from "../services/useResetForm";
import { notify } from "../services/errorHandlerService";
import { useSetting } from "../context/WebsiteSetting";
const ResetPass = () => {
  const navigate = useNavigate();
  const { siteSetting } = useSetting();

  const { handleSubmit, handleChange, userDetail } = useResetForm();
  const goBack = () => {
    navigate(-1);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (userDetail.password < 6) {
      return notify("warning", "password must be atleast 6 character");
    }

    const promise = await handleSubmit(e); // Assuming handleSubmit returns a promise
    if (promise.success == true) {
      navigate("/login");
    }
    // notifyPromise(promise, {
    //   pending: "Reset Password...",
    //   success: "Password Reset Successfully",
    //   error: "Failed to reset password!",
    // });
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
                  Reset <span className="brand_name">Password</span>
                </h1>

                <p className="short_text">Enter new password</p>
                <div className="email_box box">
                  <label htmlFor="password">Password</label>
                  <div className="field">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="password"
                      onChange={handleChange}
                      value={userDetail.password}
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <button className="login_btn">Reset Password</button>
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

export default ResetPass;
