import { Button } from "primereact/button";
import React from "react";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
const API_URL = "http://localhost:5000";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginAdmin, signupAdmin } from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { notify } from "../utils/notification";
const Signup = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
      cPassword: "",
    },
  });
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: signupAdmin,
    onSuccess: (data) => {
      if(data.success){
        notify("success","Account created successfully")
        navigate("/login")
      }
    },
    onError: (error) => {
      notify("error", error);
      console.error("Error adding user:", error.message);
    },
  });
  const onsubmit = (data) => {
    signupMutation.mutate(data);
  };
  return (
    <>
      <div className="login_page">
        <h1>Signup</h1>
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
          <div className="mb-4 inputdiv">
            <TextInput
              Label="Confirm Password"
              ID="cPassword"
              control={control}
            />
          </div>
          <div className="mb-4">
            <Button
              icon="pi pi-lock"
              label="Signup"
              onClick={handleSubmit}
              className="w-full p-3 bg-green-500 text-white rounded"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
