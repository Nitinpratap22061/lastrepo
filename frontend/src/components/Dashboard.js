import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ user, initialAccessLevel }) => {
  const [repos, setRepos] = useState([]);
  const [accessLevel, setAccessLevel] = useState(initialAccessLevel || "public");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchRepos = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }
        
        const response = await axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            per_page: 100,
            sort: "updated",
            direction: "desc"
          }
        });
        
        setRepos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError("Failed to fetch repositories. Please try again.");
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Filter repos based on access level and search term
  const filteredRepos = repos.filter(repo => {
    // Filter by access level
    if (accessLevel === "public" && repo.private) return false;
    if (accessLevel === "private" && !repo.private) return false;
    
    // Filter by search term
    if (searchTerm && !repo.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !repo.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Sort repos
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "stars") {
      comparison = a.stargazers_count - b.stargazers_count;
    } else if (sortBy === "updated") {
      comparison = new Date(a.updated_at) - new Date(b.updated_at);
    }
    
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessLevel");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="user-info">
          <img src={user?.avatarUrl} alt="User avatar" className="avatar" />
          <div className="user-details">
            <h1>Welcome, {user?.name || user?.username}!</h1>
            <p className="username">@{user?.username}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </header>

      {/* Main content */}
      <main className="dashboard-content">
        <div className="dashboard-controls">
          <div className="search-box">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <div className="access-filter">
              <button
                onClick={() => setAccessLevel("public")}
                className={`filter-btn ${accessLevel === "public" ? "active" : ""}`}
              >
                <i className="fas fa-globe"></i> Public
              </button>
              <button
                onClick={() => setAccessLevel("private")}
                className={`filter-btn ${accessLevel === "private" ? "active" : ""}`}
              >
                <i className="fas fa-lock"></i> Private
              </button>
              <button
                onClick={() => setAccessLevel("all")}
                className={`filter-btn ${accessLevel === "all" ? "active" : ""}`}
              >
                <i className="fas fa-th-list"></i> All
              </button>
            </div>
            <div className="sort-controls">
              <span>Sort by: </span>
              <button
                onClick={() => handleSort("name")}
                className={`sort-btn ${sortBy === "name" ? "active" : ""}`}
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSort("stars")}
                className={`sort-btn ${sortBy === "stars" ? "active" : ""}`}
              >
                Stars {sortBy === "stars" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
              <button
                onClick={() => handleSort("updated")}
                className={`sort-btn ${sortBy === "updated" ? "active" : ""}`}
              >
                Updated {sortBy === "updated" && (sortOrder === "asc" ? "↑" : "↓")}
              </button>
            </div>
          </div>
        </div>

        {/* Repository list */}
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading repositories...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
          </div>
        ) : sortedRepos.length === 0 ? (
          <div className="empty-message">
            <i className="fas fa-folder-open"></i>
            <p>No repositories found. Try changing your filters.</p>
          </div>
        ) : (
          <div className="repo-grid">
            {sortedRepos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <div className="repo-header">
                  <h3 className="repo-name">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </h3>
                  <span className={`repo-visibility ${repo.private ? "private" : "public"}`}>
                    <i className={`fas ${repo.private ? "fa-lock" : "fa-globe"}`}></i>
                    {repo.private ? "Private" : "Public"}
                  </span>
                </div>
                <p className="repo-description">{repo.description || "No description available"}</p>
                <div className="repo-stats">
                  <div className="stat">
                    <i className="fas fa-star"></i>
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-code-branch"></i>
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-code"></i>
                    <span>{repo.language || "N/A"}</span>
                  </div>
                </div>
                <div className="repo-footer">
                  <span className="repo-updated">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="view-btn">
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
