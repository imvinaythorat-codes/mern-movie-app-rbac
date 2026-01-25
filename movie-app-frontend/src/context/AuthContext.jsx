import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser({
        token,
        role: decoded.role,
        id: decoded.id,
      });
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    syncUserFromToken();
    setLoading(false);

    // Listen for manual localStorage changes
    window.addEventListener("storage", syncUserFromToken);
    return () => window.removeEventListener("storage", syncUserFromToken);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    syncUserFromToken();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
