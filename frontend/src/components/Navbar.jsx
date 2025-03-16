import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>GitHub Auth App</h1>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#2563EB",
    padding: "1rem",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};

export default Navbar;