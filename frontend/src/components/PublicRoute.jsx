import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"


export default function PublicRoute() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/check", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
          }

        }

      } catch (err) {
        console.error("Erro ao verificar autenticação:", err);
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  })
  if (!authChecked) {
    return <div>Verificando autenticação...</div>; 
  }

  return isAuthenticated ? <Navigate to="/board" replace /> : <Outlet />;

}