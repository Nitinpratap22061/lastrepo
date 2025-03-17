import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [accessLevel, setAccessLevel] = useState("public");
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [sortBy, setSortBy] = useState("stars"); // Default sorting by stars
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      fetchRepositories(accessToken);
    }
  }, []);

  useEffect(() => {
    // Filter repositories based on the selected access level
    let filtered = repos;
    if (accessLevel === "public") {
      filtered = repos.filter((repo) => !repo.private);
    } else if (accessLevel === "private") {
      filtered = repos.filter((repo) => repo.private);
    }

    // Sort repositories
    if (sortBy === "stars") {
      filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === "forks") {
      filtered.sort((a, b) => b.forks_count - a.forks_count);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredRepos(filtered);
  }, [accessLevel, repos, sortBy]);

  const fetchRepositories = async (token) => {
    try {
      const response = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d3748" }}>Welcome, {user?.name}!</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
        >
          Logout
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
        <img
          src={user?.avatarUrl}
          alt="Avatar"
          style={{ width: "80px", borderRadius: "50%", marginRight: "20px", border: "2px solid #ddd" }}
        />
        <div>
          <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
            <strong>Username:</strong> {user?.username}
          </p>
          <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2d3748", marginBottom: "20px" }}>Your Repositories</h2>

      {/* Access Level Buttons */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => handleAccessLevelChange("public")}
          style={{
            padding: "10px 20px",
            backgroundColor: accessLevel === "public" ? "#28a745" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = accessLevel === "public" ? "#218838" : "#5a6268")}
          onMouseOut={(e) => (e.target.style.backgroundColor = accessLevel === "public" ? "#28a745" : "#6c757d")}
        >
          Public Repos
        </button>
        <button
          onClick={() => handleAccessLevelChange("private")}
          style={{
            padding: "10px 20px",
            backgroundColor: accessLevel === "private" ? "#28a745" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = accessLevel === "private" ? "#218838" : "#5a6268")}
          onMouseOut={(e) => (e.target.style.backgroundColor = accessLevel === "private" ? "#28a745" : "#6c757d")}
        >
          Private Repos
        </button>
        <button
          onClick={() => handleAccessLevelChange("all")}
          style={{
            padding: "10px 20px",
            backgroundColor: accessLevel === "all" ? "#28a745" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = accessLevel === "all" ? "#218838" : "#5a6268")}
          onMouseOut={(e) => (e.target.style.backgroundColor = accessLevel === "all" ? "#28a745" : "#6c757d")}
        >
          All Repos
        </button>
      </div>

      {/* Sorting Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="sortBy" style={{ marginRight: "10px", fontSize: "1rem", color: "#4a5568" }}>Sort by:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Repository Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
            onClick={() => window.open(repo.html_url, "_blank")}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2d3748", marginBottom: "10px" }}>
              {repo.name}
            </h3>
            <p style={{ fontSize: "1rem", color: "#4a5568", marginBottom: "10px" }}>{repo.description}</p>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "0.875rem", color: "#718096" }}>
                ⭐ {repo.stargazers_count}
              </span>
              <span style={{ fontSize: "0.875rem", color: "#718096" }}>
                🍴 {repo.forks_count}
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#718096" }}>
              <strong>Visibility:</strong> {repo.private ? "Private" : "Public"}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#718096" }}>
              <strong>Default Branch:</strong> {repo.default_branch}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
