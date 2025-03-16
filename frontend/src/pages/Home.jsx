import React from "react";
import AuthButton from "../components/AuthButton";

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to GitHub Auth App</h1>
      <AuthButton />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#F3F4F6",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
};

export default Home;