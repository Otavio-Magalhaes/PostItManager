import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ou useEffect para buscar o usuário se já estiver logado
  
  useEffect(() => {
    setUser({ name: "Teste", id: "123" }); // teste inicial
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
