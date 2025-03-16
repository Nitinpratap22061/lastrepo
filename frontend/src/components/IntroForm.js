import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IntroForm = ({ user }) => {
  const [linkedin, setLinkedin] = useState("");
  const [source, setSource] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // Send the updated user data to the backend
      const response = await axios.put(
        "https://lastrepo-6nm3.onrender.com/user",
        { linkedin, source, isNewUser: false }, // Set isNewUser to false
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use backticks for template literals
          },
        }
      );

      // Update the user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect to the dashboard after successful submission
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome! Please complete your profile</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        {/* Name Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Name:
            <input
              type="text"
              value={user?.name || ""}
              readOnly
              style={{ width: "100%", padding: "8px", marginTop: "5px", backgroundColor: "#f0f0f0" }}
            />
          </label>
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Email:
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              style={{ width: "100%", padding: "8px", marginTop: "5px", backgroundColor: "#f0f0f0" }}
            />
          </label>
        </div>

        {/* LinkedIn Profile URL Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            LinkedIn Profile URL:
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>

        {/* "Where did you hear about us?" Field */}
        <div style={{ marginBottom: "15px" }}>
          <label>
            Where did you hear about us?
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default IntroForm;
