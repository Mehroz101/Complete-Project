import { createContext, useContext, useState } from "react";
const API_URL = "http://localhost:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [checkuserstatus, setCheckuserstatus] = useState(false);
  const login = (token) => {
    localStorage.setItem("admintoken", token);
  };
  const logout = () => {
    localStorage.removeItem("admintoken");
  };
  const checkuser = () => {
    if (localStorage.getItem("admintoken") !== null) {
      setCheckuserstatus(true);
    } else {
      setCheckuserstatus(false);
    }
  };

  const value = { login, logout, checkuser, checkuserstatus }; // Return checkuser
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
