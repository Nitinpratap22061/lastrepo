import React from "react";
import { loginWithGitHub } from "../utils/api";

const AuthButton = () => {
  return (
    <button style={styles.button} onClick={loginWithGitHub}>
      Login with GitHub
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: "#1E293B",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
  },
};

export default AuthButton;