import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import IntroForm from "./components/IntroForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    const accessToken = new URLSearchParams(window.location.search).get("accessToken");

    if (token && accessToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("accessToken", accessToken);

      // Fetch user data after storing the token
      fetch("https://lastrepo-6nm3.onrender.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setIsLoading(false);

          // Redirect based on isNewUser
          if (data.isNewUser) {
            window.location.href = "/intro"; // Redirect to intro form
          } else {
            window.location.href = "/dashboard"; // Redirect to dashboard
          }
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        fetch("https://lastrepo-6nm3.onrender.com/user", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route
          path="/intro"
          element={user?.isNewUser ? <IntroForm user={user} /> : <Navigate to="/dashboard" />}
        />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
