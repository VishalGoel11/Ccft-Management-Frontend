import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Typography, AppBar, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PieChartIcon from "@mui/icons-material/PieChart";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Completed", value: 55, color: "#ff0000" },
  { name: "Ongoing", value: 25, color: "#ff9900" },
  { name: "Remaining", value: 20, color: "#4CAF50" },
];

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex">
      {/* Sidebar */}
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
        {/* Navbar */}
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

        {/* Content */}
        <Box display="flex" justifyContent="space-around" mt={8}>
          {/* Pie Chart */}
          <Box>
            <Typography variant="h6" align="center">Project Status</Typography>
            <PieChart width={200} height={200}>
              <Pie data={data} cx={100} cy={100} innerRadius={50} outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
          
          {/* Data Boxes */}
          <Box>
            <Typography variant="body1" align="center">All Projects</Typography>
            <Box bgcolor="#66BB6A" color="white" p={2} borderRadius={2} textAlign="center">55</Box>
          </Box>
          <Box>
            <Typography variant="body1" align="center">Ongoing Projects</Typography>
            <Box bgcolor="#FFA726" color="white" p={2} borderRadius={2} textAlign="center">25</Box>
          </Box>
          <Box>
            <Typography variant="body1" align="center">Completed Projects</Typography>
            <Box bgcolor="#AB47BC" color="white" p={2} borderRadius={2} textAlign="center">30</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;