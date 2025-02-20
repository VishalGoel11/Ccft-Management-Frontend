import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip, Box, IconButton, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PieChartIcon from '@mui/icons-material/PieChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';


const Sidebar = () => {

  const [open, setOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleProjectClick = () => {
    setProjectOpen(!projectOpen);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 200 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 200 : 60,
          transition: 'width 0.3s',
          background: 'linear-gradient(to bottom, #ffffff, #e3f2fd)',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" p={1}>
        <img src={'./ccft.png'} alt="Logo" style={{ width: open ? 100 : 40, transition: 'width 0.3s', cursor: 'pointer' }} onClick={() => navigate('/dashboard')} />
        <IconButton onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
      </Box>
      <List>
        <Tooltip title="Projects" placement="right" disableHoverListener={open}>
          <ListItem button onClick={handleProjectClick}>
            <ListItemIcon><PieChartIcon /></ListItemIcon>
            {open && <ListItemText primary="Projects" />}
            {open && (projectOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItem>
        </Tooltip>
        <Collapse in={projectOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => navigate('/all-projects')} sx={{ pl: 4 }}>
              <ListItemText primary="All Projects" />
            </ListItem>
            <ListItem button onClick={() => navigate('/completed-projects')} sx={{ pl: 4 }}>
              <ListItemText primary="Completed Projects" />
            </ListItem>
            <ListItem button onClick={() => navigate('/pending-projects')} sx={{ pl: 4 }}>
              <ListItemText primary="Pending Projects" />
            </ListItem>
          </List>
        </Collapse>
        <Tooltip title="Clients" placement="right" disableHoverListener={open}>
          <ListItem button onClick={() => navigate('/clients')}>
            <ListItemIcon><CheckCircleIcon /></ListItemIcon>
            {open && <ListItemText primary="Clients" />}
          </ListItem>
        </Tooltip>
        <Tooltip title="Tests" placement="right" disableHoverListener={open}>
          <ListItem button onClick={() => navigate('/tests')}>
            <ListItemIcon><HourglassFullIcon /></ListItemIcon>
            {open && <ListItemText primary="Tests" />}
          </ListItem>
        </Tooltip>
        <Tooltip title="Users" placement="right" disableHoverListener={open}>
          <ListItem button onClick={() => navigate('/users')}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            {open && <ListItemText primary="Users" />}
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default Sidebar;
