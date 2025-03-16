import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.log(" No token found, user not authenticated.");
        return;
      }

      try {
        console.log("🔍 Fetching user data with token:", token);
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ User Data Fetched:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error(" Error fetching user:", error.response?.data || error.message);
        setUser(null);
        localStorage.removeItem("token"); 
      }
    };

    fetchUser();
  }, [token]); 
  return (
    <AuthContext.Provider value={{ user, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
