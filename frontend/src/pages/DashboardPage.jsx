import React, { useEffect, useState } from "react";
import { fetchUserData } from "../utils/api";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (token) {
      fetchUserData(token).then((data) => setUser(data));
    }
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      <div style={styles.profile}>
        <img
          src={user.avatarUrl}
          alt="Profile"
          style={styles.avatar}
        />
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.username}>{user.username}</p>
        <p style={styles.email}>{user.email}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  profile: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  avatar: {
    width: "6rem",
    height: "6rem",
    borderRadius: "50%",
    marginBottom: "1rem",
  },
  name: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  username: {
    color: "#6B7280",
  },
  email: {
    color: "#6B7280",
  },
};

export default DashboardPage;