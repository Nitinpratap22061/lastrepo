
import React, { useState } from "react";

const Login = () => {
  const [accessLevel, setAccessLevel] = useState("public");
  const [isHovering, setIsHovering] = useState(false);

  const handleLogin = () => {
    window.location.href = `https://lastrepo-6nm3.onrender.com/auth/github?accessLevel=${accessLevel}`;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <i className="fab fa-github github-logo"></i>
          <h1>GitHub Repository Explorer</h1>
          <p>Connect your GitHub account to view and manage your repositories</p>
        </div>
        
        <div className="access-level-selector">
          <h3>Choose access level:</h3>
          <div className="access-options">
            <label className={`access-option ${accessLevel === 'public' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="accessLevel"
                value="public"
                checked={accessLevel === 'public'}
                onChange={() => setAccessLevel('public')}
              />
              <div className="option-icon"><i className="fas fa-globe"></i></div>
              <div className="option-info">
                <h4>Public Repositories</h4>
                <p>Access only your public repositories</p>
              </div>
            </label>
            
            <label className={`access-option ${accessLevel === 'private' ? 'selected' : ''}`}>
             <input
                type="radio"
                name="accessLevel"
                value="private"
                checked={accessLevel === 'private'}
                onChange={() => setAccessLevel('private')}
              />
              <div className="option-icon"><i className="fas fa-lock"></i></div>
              <div className="option-info">
                <h4>Private Repositories</h4>
                <p>Access only your private repositories</p>
              </div>
            </label>
            
            <label className={`access-option ${accessLevel === 'all' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="accessLevel"
                value="all"
                checked={accessLevel === 'all'}
                onChange={() => setAccessLevel('all')}
              />
              <div className="option-icon"><i className="fas fa-th-list"></i></div>
              <div className="option-info">
                <h4>All Repositories</h4>
                <p>Access all your repositories</p>
              </div>
            </label>
          </div>
        </div>
        
        <button
          className="github-login-btn"
          onClick={handleLogin}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <i className="fab fa-github"></i>
          {isHovering ? "Let's Go!" : "Login with GitHub"}
        </button>
      </div>
    </div>
  );
};

export default Login;
