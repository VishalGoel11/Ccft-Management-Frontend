import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LoginPage from "./container/Login";
import Dashboard from "./container/dashboard";

const Navbar = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(now.toDateString() + " " + now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img src='./ccft.png' alt="Company Logo" style={{ height: "50px", marginRight: "10px" }} />
        </Box>
        <Typography variant="subtitle2">{dateTime}</Typography>
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
