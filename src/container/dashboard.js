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
import PieChartIcon from "@mui/icons-material/PieChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { getLocalStorage, handleHttpRequest } from "../api/utility/Utility";
import { Tooltip as MaterialUITooltip } from '@mui/material';
import { getAllSample as Sample } from "../api/const/api-url";
import Sidebar from "./sidebar";


const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const [sampleCount, setSampleCount] = useState({
  //   "completed" : 0,
  //   "pending" : 0
  // })
  const [cardData,setCardData] =  useState([
    {
      title: "All Projects",
      value: 55,
      completed: 45,
      icon: <ShoppingCartIcon fontSize="large" />,
      color: "linear-gradient(to right, #4facfe, #00f2fe)",
      path: "/all-projects"
    },
  
    {
      title: "Completed Projects",
      value: 30,
      completed: 28,
      icon: <AutorenewIcon fontSize="large" />,
      color: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
      path: "/completed-projects"
    },
    {
      title: "Pending Projects", 
      value: 15,
      completed: 0,
      icon: <HourglassFullIcon fontSize="large" />,
      color: "linear-gradient(to right, #ff9800, #ffcc80)",
      path: "/pending-projects"
    }
  ]);

  const [pieData,setPieData] = useState([
    { name: "Completed", value: 30, color: "#4caf50" },
    { name: "Ongoing", value: 25, color: "#ff9800" },
    { name: "Pending", value: 15, color: "#f44336" }
  ]);


  // useEffect(()=>{
  //   const tokenValue = getLocalStorage();
  //  let getAllSample = async ()=>{
  //     if(tokenValue === null || tokenValue === ""){
  //       navigate("/");
  //     }else{
  //       const response = await handleHttpRequest("GET",Sample,"",true,tokenValue);

  //       const pending = response.data.reduce((count, sample) => {
  //         const pendingTests = sample.test.filter(t => t.t_status === "Pending").length;
  //         return count + pendingTests;
  //       }, 0);
        
  //       const completed = response.data.reduce((count, sample) => {
  //         const pendingTests = sample.test.filter(t => t.t_status === "Completed").length;
  //         return count + pendingTests;
  //       }, 0);

  //       setPieData((prevpiedata)=>[
  //         {
  //           ...prevpiedata[0],
  //           value : completed
  //         },
  //         {
  //           ...prevpiedata[1],
  //           value : pending
  //         },
  //         {
  //           ...prevpiedata[2],
  //           value : completed + pending
  //         }
  //       ])
  //       setCardData((prevcarddata)=>[
  //         {
  //           ...prevcarddata[0],
  //           value : completed
  //         },
  //         {
  //           ...prevcarddata[1],
  //           value : pending
  //         },
  //         {
  //           ...prevcarddata[2],
  //           value : completed + pending
  //         }
  //       ])
  //     }
    
  //   }
  // getAllSample()
  // },[])


  return (
    <>
    
      (<Box display="flex">
        <Sidebar /> 
     

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${open ? 200 : 60}px)` }}/>
         

        <Container maxWidth="lg" sx={{ marginTop:-10 }}>
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
                    cursor: "pointer"
                  }}
                  onClick={() => navigate(card.path)}
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
    </Box>)
    </>
  );
};

export default Dashboard;
