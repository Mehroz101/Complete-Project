import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchProvider } from "./context/SearchContext.jsx";
import { ToastContainer } from "react-toastify";
import { SettingProvider } from "./context/WebsiteSetting.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <SettingProvider>
      <SearchProvider>
        <App />
        <ToastContainer />
      </SearchProvider>
    </SettingProvider>
  </QueryClientProvider>
);
