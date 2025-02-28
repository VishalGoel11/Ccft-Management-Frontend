import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Card,
  Grid,
  Container
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Sidebar from "./sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const data = [
    { day: "Mon", All: 55, Completed: 45, Pending: 10 },
    { day: "Tue", All: 50, Completed: 40, Pending: 10 },
    { day: "Wed", All: 60, Completed: 50, Pending: 10 },
    { day: "Thu", All: 65, Completed: 55, Pending: 10 },
    { day: "Fri", All: 70, Completed: 60, Pending: 10 },
    { day: "Sat", All: 75, Completed: 65, Pending: 10 },
    { day: "Sun", All: 80, Completed: 70, Pending: 10 }
  ];

  const cardData = [
    {
      title: "All Projects",
      value: 55,
      icon: <ShoppingCartIcon fontSize="large" />,
      color: "linear-gradient(to right, #4facfe, #00f2fe)",
      path: "/all-projects"
    },
    {
      title: "Completed Projects",
      value: 30,
      icon: <AutorenewIcon fontSize="large" />,
      color: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      path: "/completed-projects"
    },
    {
      title: "Pending Projects",
      value: 15,
      icon: <HourglassFullIcon fontSize="large" />,
      color: "linear-gradient(to right, #ff9800, #ffcc80)",
      path: "/pending-projects"
    }
  ];

  return (
    <>
      <Box display="flex">
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AppBar position="fixed" sx={{ width: "calc(100% - 200px)" }} />

          <Container maxWidth="lg" sx={{ marginTop: -10 }}>
            {/* <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={data} margin={{ top: 70, right: 30, left: 0, bottom: 10 }}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="All" fill="#4facfe" />
                      <Bar dataKey="Completed" fill="#4caf50" />
                      <Bar dataKey="Pending" fill="#f44336" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
            </Grid> */}

            <Grid container spacing={2} mt={4}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      background: card.color,
                      borderRadius: 3,
                      p: 2,
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: 3,
                      cursor: "pointer"
                    }}
                    onClick={() => navigate(card.path)}
                  >
                    <Typography variant="h6">{card.title}</Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      {card.icon}
                      <Typography variant="h4">{card.value}</Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
