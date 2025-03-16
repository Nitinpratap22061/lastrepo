import axios from "axios";

const API_URL = "http://localhost:5000"; // Replace with your backend URL

export const loginWithGitHub = () => {
  window.location.href = `${API_URL}/auth/github`;
};

export const fetchUserData = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};