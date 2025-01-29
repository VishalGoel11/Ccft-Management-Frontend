import React, { useState } from "react";
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
import PieChartIcon from "@mui/icons-material/PieChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const cardData = [
    {
      title: "All Projects",
      value: 55,
      completed: 45,
      icon: <ShoppingCartIcon fontSize="large" />, 
      color: "linear-gradient(to right, #4facfe, #00f2fe)",
    },
    {
      title: "Ongoing Projects",
      value: 25,
      completed: 20,
      icon: <RocketLaunchIcon fontSize="large" />, 
      color: "linear-gradient(to right, #43e97b, #38f9d7)",
    },
    {
      title: "Completed Projects",
      value: 30,
      completed: 28,
      icon: <AutorenewIcon fontSize="large" />, 
      color: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    },
  ];

  const pieData = [
    { name: "Completed", value: 30, color: "#4caf50" },
    { name: "Ongoing", value: 25, color: "#ff9800" },
    { name: "Pending", value: 15, color: "#f44336" },
  ];

  return (
    <Box display="flex">
      <Drawer variant="permanent" open={open} sx={{ width: open ? 200 : 60, flexShrink: 0 }}>
        <Box display="flex" justifyContent="center" p={1}>
          <img src='./ccft.png' alt="Company Logo" width={open ? "100" : "50"} />
        </Box>
        <List>
          <ListItem button>
            <ListItemIcon><PieChartIcon /></ListItemIcon>
            {open && <ListItemText primary="All Projects" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon><HourglassFullIcon /></ListItemIcon>
            {open && <ListItemText primary="Ongoing" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon><CheckCircleIcon /></ListItemIcon>
            {open && <ListItemText primary="Completed" />}
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${open ? 200 : 60}px)` }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setOpen(!open)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              DASHBOARD
            </Typography>
            <Typography>{new Date().toLocaleString()}</Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 10 }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <PieChart width={300} height={300}>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </Box>
            </Grid>
          </Grid>

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
                  }}
                >
                  <Typography variant="h6">{card.title}</Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    {card.icon}
                    <Typography variant="h4">{card.value}</Typography>
                  </Box>
                  <Typography variant="body2">Completed Projects {card.completed}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
