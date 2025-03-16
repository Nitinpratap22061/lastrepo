import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [accessLevel, setAccessLevel] = useState("public"); // Default to public repos

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchRepositories(accessToken, accessLevel);
    }
  }, [accessLevel]);

  const fetchRepositories = async (token, level) => {
    try {
      const response = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          visibility: level, // Fetch public, private, or all repos
        },
      });
      setRepos(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleAccessLevelChange = (level) => {
    setAccessLevel(level);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Welcome, {user?.name}!</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <h2>Your GitHub Details</h2>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img
          src={user?.avatarUrl}
          alt="Avatar"
          style={{ width: "80px", borderRadius: "50%", marginRight: "20px" }}
        />
        <div>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>

      <h2>Your Repositories</h2>

      {/* Access Level Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleAccessLevelChange("public")}
          style={{
            marginRight: "10px",
            backgroundColor: accessLevel === "public" ? "#28a745" : "#6c757d",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Public Repos
        </button>
        <button
          onClick={() => handleAccessLevelChange("private")}
          style={{
            marginRight: "10px",
            backgroundColor: accessLevel === "private" ? "#28a745" : "#6c757d",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Private Repos
        </button>
        <button
          onClick={() => handleAccessLevelChange("all")}
          style={{
            backgroundColor: accessLevel === "all" ? "#28a745" : "#6c757d",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          All Repos
        </button>
      </div>

      {/* Repository List */}
      <ul style={{ listStyle: "none", padding: "0" }}>
        {repos.map((repo) => (
          <li
            key={repo.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0366d6", textDecoration: "none" }}
              >
                {repo.name}
              </a>
            </h3>
            <p>{repo.description}</p>
            <p>
              <strong>Stars:</strong> {repo.stargazers_count}
            </p>
            <p>
              <strong>Forks:</strong> {repo.forks_count}
            </p>
            <p>
              <strong>Visibility:</strong> {repo.private ? "Private" : "Public"}
            </p>
            <p>
              <strong>Branches:</strong> {repo.default_branch}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
