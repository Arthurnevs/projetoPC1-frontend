import { Icons } from "@/components/icons";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setAuth(!!token);
  }, []);

  useEffect(() => {
    if (auth !== null) {
      setIsLoading(false);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {isLoading ? (
        <Icons.Spinner
          className="size-40 m-auto animate-spin h-screen"
          stroke="#ea580c"
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
