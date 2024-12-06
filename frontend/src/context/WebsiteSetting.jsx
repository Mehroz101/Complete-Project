import React from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.REACT_APP_API_URL;

const setingContext = createContext();

export const SettingProvider = ({ children }) => {
  const { data: siteSetting } = useQuery({
    queryKey: ["sitename"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/site/getsitsettings`);
      console.log(response.data.data);
      return response.data.data;
    },
  });
  return (
    <setingContext.Provider value={{ siteSetting }}>
      {children}
    </setingContext.Provider>
  );
};

export const useSetting = () => useContext(setingContext);
