import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import { useAuth } from "../context/AuthContext";
import { notify } from "../utils/notification";
import {
  changePassword,
  getSiteName,
  siteNameUpdate,
} from "../services/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
const Setting = () => {
  // Default values for the password reset form
  const { logout } = useAuth();
  const {
    control: controlPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();
  const {
    control: controlSite,
    handleSubmit: handleSiteSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      sitename: "",
    },
  });

  const passwordMutation = useMutation({
    mutationFn: (data) => {
      return changePassword(data);
    },
    onSuccess: (data) => {
      notify("success", data.message);
      logout();
    },
    onError: (error) => {
      notify("error", error.message);
      console.error("Error adding user:", error.message);
    },
  });
  const siteNameMutation = useMutation({
    mutationFn: siteNameUpdate,
    onSuccess: (data) => {
      notify("success", data.message);
    },
    onError: (error) => {
      notify("error", error.message);
    },
  });
  const onPasswordSubmit = (data) => {
    passwordMutation.mutate(data);
  };
  const onSiteSubmit = (data) => {
    siteNameMutation.mutate(data);
  };
  const { data: siteName } = useQuery({
    queryKey: ["sitename"],
    queryFn: getSiteName,
  });
  useEffect(() => {
    if (siteName) {
      setValue("sitename", siteName);
    }
  }, [siteName, controlSite]);
  return (
    <>
      <div className="setting_page flex">
        <div className="settings">
          {/* <div className="profile flex align-items-center justify-content-center gap-6 ">
            <div className="profile_pic overflow-hidden border-round-lg">
              <img
                src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                alt="image"
              />
            </div>
            <div className="profile_btn flex flex-column gap-5">
              <label
                htmlFor="file"
                className="cursor-pointer text-lg font-semibold bg-cyan-500 text-white p-2 flex align-items-center justify-content-center border-round-lg gap-2"
              >
                <i className="pi pi-cloud-upload"></i>
                <strong>Choose a file</strong>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={onUpload}
                accept="image/*"
              />
              <button
                onClick={deletePicture}
                className="cursor-pointer text-lg font-semibold bg-red-400 text-white p-2 flex align-items-center justify-content-center border-round-lg border-none gap-2"
              >
                Delete Picture
              </button>
            </div>
          </div> */}

          {/* User Settings Form */}
          {/* <div className="form mt-4 bg-white shadow-3 p-4">
            <form onSubmit={handleUserSubmit(onUserSubmit)}>
              <CustomInput
                label="Full Name"
                name="name"
                control={controlUser}
                placeholder="Enter your full name"
                required={true}
              />

              <CustomInput
                label="Email"
                name="email"
                control={controlUser}
                type="email"
                placeholder="Enter your email"
                required={true}
              />
              <button
                type="submit"
                className="mt-5 w-full bg-cyan-500 text-white p-3 flex align-items-center justify-content-center border-round-100 border-none gap-2"
              >
                Submit
              </button>
            </form>
          </div> */}

          {/* Password Reset Form */}
          <div className="sitename">
            <h1>Setting</h1>
            <div className="sitename_form">
              <form onSubmit={handleSiteSubmit(onSiteSubmit)}>
                <CustomInput
                  label="Site Name"
                  name="sitename"
                  control={controlSite}
                  type="text"
                  placeholder="Enter your site name"
                  required={true}
                  defaultValue={siteName} // Provide the default value here
                />
                <Button
                  type="submit"
                  label="Update"
                  style={{
                    marginBottom: "18px",
                    padding: "13px 10px",
                  }}
                />
              </form>
            </div>
          </div>
          <div className="password_form mt-4 p-4">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              <CustomInput
                label="Username"
                name="username"
                control={controlPassword}
                type="text"
                placeholder="Enter your username"
                required={true}
              />
              <CustomInput
                label="Old Password"
                name="oldPassword"
                control={controlPassword}
                type="password"
                placeholder="Enter your old password"
                required={true}
              />

              <CustomInput
                label="New Password"
                name="newPassword"
                control={controlPassword}
                type="password"
                placeholder="Enter your new password"
                required={true}
              />
              <button
                type="submit"
                className="mt-5 w-full bg-cyan-500 text-white p-3 flex align-items-center justify-content-center border-round-100 border-none gap-2"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
