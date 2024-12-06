import { Button } from "primereact/button";
import React from "react";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
const API_URL = "http://localhost:5000";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginAdmin } from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notification";
const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { login, checkuser } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      login(data.token);
      notify("success", "login successfully");
      navigate("/dashboard");
    },
    onError: (error) => {
      notify("error", error);
      console.error("Error adding user:", error.message);
    },
  });
  const onsubmit = (data) => {
    console.log(data);
    loginMutation.mutate(data);
  };
  return (
    <>
      <div className="login_page">
        <h1>login</h1>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="bg-white rounded shadow-md w-full"
        >
          <div className="mb-4 inputdiv">
            <TextInput Label="Username" ID="username" control={control} />
          </div>
          <div className="mb-4 inputdiv">
            <TextInput Label="Password" ID="password" control={control} />
          </div>
          <div className="mb-4">
            <Button
              icon="pi pi-lock"
              label="Login"
              onClick={handleSubmit}
              className="w-full p-3 bg-green-500 text-white rounded"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
