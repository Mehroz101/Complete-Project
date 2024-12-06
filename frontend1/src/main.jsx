import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardContextProvider } from "./context/DataContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "./index.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeflex/primeflex.css";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <DashboardContextProvider>
          <PrimeReactProvider>
            <App />
            <ToastContainer />
          </PrimeReactProvider>
        </DashboardContextProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
