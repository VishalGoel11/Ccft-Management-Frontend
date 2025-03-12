import React, { useEffect, useState } from "react";
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
import AllProjects from "./AllProjects"; // Import the AllProjects component
import { getLocalStorage, handleHttpRequest } from "../api/utility/Utility";
import { getAllSample } from "../api/const/api-url";
import { all } from "axios";

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

  const [cardData,setCardData] = useState([
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
  ]);


  useEffect(()=>{
    
    const allSample = async()=>{
      const token = getLocalStorage();
      if(token!=null){
          const response = await handleHttpRequest("GET",getAllSample,{},true,token);
          console.log("Response",response);
          const complete = response.data.filter((project)=>project.t_status==='completed');
          console.log("com",complete)
          const pending = response.data.filter((project)=>project.t_status==='pending');
          console.log("pen",pending)
          const value = "value";
          setCardData([{...cardData[0],[value]:complete.length},{...cardData[1],[value]:pending.length}])
      }else{
        navigate("/")
      }
    }
    allSample();
  })


  return (
    <>
      <Box display="flex">
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AppBar position="fixed" sx={{ width: "calc(100% - 200px)" }} />

          <Container maxWidth="lg" sx={{ marginTop: -10 }}>
            <Grid container spacing={2} mt={4}>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    background: cardData[0].color,
                    borderRadius: 3,
                    p: 2,
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: 3,
                    cursor: "pointer"
                  }}
                  // onClick={() => navigate(cardData[0].path)}
                >
                  <Typography variant="h6">{cardData[0].title}</Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    {cardData[0].icon}
                    <Typography variant="h4">{cardData[0].value}</Typography>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    background: cardData[1].color,
                    borderRadius: 3,
                    p: 2,
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: 3,
                    cursor: "pointer"
                  }}
                  // onClick={() => navigate(cardData[1].path)}
                >
                  <Typography variant="h6">{cardData[1].title}</Typography>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    {cardData[1].icon}
                    <Typography variant="h4">{cardData[1].value}</Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>

            {/* <Box mt={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Completed Projects Table</Typography>
                  {/* Add your completed projects table here */}
                {/* </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Pending Projects Table</Typography> */}
                  {/* Add your pending projects table here */}
                {/* </Grid> */}
              {/* </Grid> */}
            {/* </Box> */} 

            <Box mt={4}>
              <AllProjects /> {/* Include the AllProjects component */}
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;