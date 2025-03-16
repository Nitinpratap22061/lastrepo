import axios from "axios";

const API_URL = "https://lastrepo-6nm3.onrender.com"; // Replace with your backend URL

export const loginWithGitHub = () => {
  window.location.href = `${API_URL}/auth/github`;
};

export const fetchUserData = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
