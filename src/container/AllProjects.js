import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectForm from './Form';
import Sidebar from "./sidebar";

const AllProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    s_name: "",
    t_id: "",
    s_date_received: "",
    s_report: "",
    s_raw_data: "",
    t_status: "new"
  });
    const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = [
        {
          s_id: "609ff9c1-69ba-499d-81e2-833e4b99d4d1",
          s_name: "ABC Sample",
          t_id: "T001",
          s_date_received: "ABC building 7th Floor Modinagar(201204) Ghaziabad",
          s_report: "Report_01.pdf",
          s_raw_data: "This report contains data of the test of ABC client's sample s1",
          t_status: "completed"
        },
        {
          s_id: "709ff9c1-69ba-499d-81e2-833e4b99d4d2",
          s_name: "XYZ Sample",
          t_id: "T002",
          s_date_received: "XYZ Complex, Sector 12",
          s_report: "Report_02.pdf",
          s_raw_data: "XYZ client sample data",
          t_status: "pending"
        },
        {
          s_id: "809ff9c1-69ba-499d-81e2-833e4b99d4d3",
          s_name: "New Sample",
          t_id: "T003",
          s_date_received: "New Location",
          s_report: "Report_03.pdf",
          s_raw_data: "New sample test data",
          t_status: "new"
        }
      ];
      setProjects(response);
    };
    fetchData();
  }, []);

  const getRowColor = (status) => {
    switch (status) {
      case 'completed':
        return '#e8f5e9';
      case 'pending':
        return '#FFC0CB';
      case 'new':
        return '#e3f2fd';
      default:
        return 'transparent';
    }
  };

  const handleOpen = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({
        s_name: "",
        t_id: "",
        s_date_received: "",
        s_report: "",
        s_raw_data: "",
        t_status: "new"
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setFormData({
      s_name: "",
      t_id: "",
      s_date_received: "",
      s_report: "",
      s_raw_data: "",
      t_status: "new"
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (data) => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.s_id === editingProject.s_id ? { ...p, ...data } : p
      ));
    } else {
      setProjects([...projects, { s_id: Date.now().toString(), ...data }]);
    }
    handleClose();
  };

  const handleDelete = (s_id) => {
    setProjects(projects.filter(project => project.s_id !== s_id));
  };

  return (
    <Box sx={{ p: 3 }}>
     <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
   <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: 'margin 0.3s',
            marginLeft: sidebarOpen ? '200px' : '60px', 
            padding: '10px',
            width: `calc(100% - ${sidebarOpen ? '200px' : '60px'})`, 
            overflowX: 'auto',
          }}
        >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#3f51b5",
            color: "white",
            p: 4,
            borderRadius: 1,
          }}
        >
        <Typography variant="h6">All Projects</Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => handleOpen()}
          sx={{
            backgroundColor: "#f50057",
            '&:hover': {
              backgroundColor: "#c51162"
            }
          }}
        >
          ADD NEW
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#eeeeee" }}>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Sample Name</TableCell>
              <TableCell>Test ID</TableCell>
              <TableCell>Date Received</TableCell>
              <TableCell>Report</TableCell>
              <TableCell>Raw Data</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow 
                key={project.s_id}
                sx={{ 
                  backgroundColor: getRowColor(project.t_status),
                  '&:hover': {
                    filter: 'brightness(0.95)'
                  }
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{project.s_name}</TableCell>
                <TableCell>{project.t_id || "N/A"}</TableCell>
                <TableCell>{project.s_date_received}</TableCell>
                <TableCell>
                  <a href={`/${project.s_report}`} target="_blank" rel="noopener noreferrer">
                    {project.s_report}
                  </a>
                </TableCell>
                <TableCell>{project.s_raw_data}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{project.t_status}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <EditIcon 
                      sx={{ cursor: 'pointer', color: '#2196f3' }} 
                      onClick={() => handleOpen(project)}
                    />
                    <DeleteIcon 
                      sx={{ cursor: 'pointer', color: '#f44336' }} 
                      onClick={() => handleDelete(project.s_id)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
</Box>
      <Modal 
        open={open} 
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 600, mx: 2 }}>
          <ProjectForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isEditMode={!!editingProject}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AllProjectsPage;