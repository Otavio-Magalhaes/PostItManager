import React from "react";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
