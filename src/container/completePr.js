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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./sidebar";
import TestForm from "./testform";
import VendorForm from "./VendorForm";
import ClientForm from "./ClientForm";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompletePr = () => {
  const [projects, setProjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [isTestFormOpen, setIsTestFormOpen] = useState(false);
  const [isVendorFormOpen, setIsVendorFormOpen] = useState(false);
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    s_name: "",
    t_id: "",
    v_id: "",
    c_id: "",
    s_date_received: "",
    s_report: "",
    s_raw_data: "",
    t_status: "completed"
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      const projectResponse = [
        {
          s_id: "1",
          s_name: "ABC Sample",
          t_id: "T001",
          v_id: "V001",
          c_id: "C001",
          s_date_received: "2024-01-15",
          s_report: "Report_01.pdf",
          s_raw_data: "Sample test data for ABC project",
          t_status: "completed"
        },
        {
          s_id: "2",
          s_name: "XYZ Sample",
          t_id: "T002",
          v_id: "V002",
          c_id: "C002",
          s_date_received: "2024-02-01",
          s_report: "Report_02.pdf",
          s_raw_data: "Sample test data for XYZ project",
          t_status: "pending"
        }
      ];
      const testResponse = [
        { t_id: "T001", t_name: "Test 1" },
        { t_id: "T002", t_name: "Test 2" }
      ];
      const vendorResponse = [
        { v_id: "V001", v_name: "Vendor 1" },
        { v_id: "V002", v_name: "Vendor 2" }
      ];
      const clientResponse = [
        { c_id: "C001", c_name: "Client 1" },
        { c_id: "C002", c_name: "Client 2" }
      ];
      const completedProjects = projectResponse.filter(project => project.t_status === "completed");
      setProjects(completedProjects);
      setTests(testResponse);
      setVendors(vendorResponse);
      setClients(clientResponse);
    };
    fetchData();
  }, []);


    const handleDelete = (s_id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          setProjects(projects.filter(project => project.s_id !== s_id));
          Swal.fire({
            title: "Deleted!",
            text: "The project has been deleted.",
            icon: "success"
          });
          toast.info("Project deleted successfully!");
        }
      });
    };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProject({
      s_name: "",
      t_id: "",
      v_id: "",
      c_id: "",
      s_date_received: "",
      s_report: "",
      s_raw_data: "",
      t_status: "completed"
    });
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (newProject.t_status === "completed") {
      setProjects([...projects, { s_id: Date.now().toString(), ...newProject }]);
    }
    handleClose();
  };

  const handleOpenTestForm = () => setIsTestFormOpen(true);
  const handleCloseTestForm = () => setIsTestFormOpen(false);
  const handleTestFormSubmit = (newTest) => {
    setTests([...tests, newTest]);
    setIsTestFormOpen(false);
  };

  const handleOpenVendorForm = () => setIsVendorFormOpen(true);
  const handleCloseVendorForm = () => setIsVendorFormOpen(false);
  const handleVendorFormSubmit = (newVendor) => {
    setVendors([...vendors, newVendor]);
    setIsVendorFormOpen(false);
  };

  const handleOpenClientForm = () => setIsClientFormOpen(true);
  const handleCloseClientForm = () => setIsClientFormOpen(false);
  const handleClientFormSubmit = (newClient) => {
    setClients([...clients, newClient]);
    setIsClientFormOpen(false);
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
          <Typography variant="h6">Completed Projects</Typography>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            ADD NEW
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Sample Name</TableCell>
                <TableCell>Test ID</TableCell>
                <TableCell>Vendor ID</TableCell>
                <TableCell>Client ID</TableCell>
                <TableCell>Date Received</TableCell>
                <TableCell>Report</TableCell>
                <TableCell>Raw Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={project.s_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.s_id}</TableCell>
                  <TableCell>{project.s_name}</TableCell>
                  <TableCell>{project.t_id || "N/A"}</TableCell>
                  <TableCell>{project.v_id || "N/A"}</TableCell>
                  <TableCell>{project.c_id || "N/A"}</TableCell>
                  <TableCell>{project.s_date_received}</TableCell>
                  <TableCell>
                    <a href={`/${project.s_report}`} target="_blank" rel="noopener noreferrer">
                      {project.s_report}
                    </a>
                  </TableCell>
                  <TableCell>{project.s_raw_data}</TableCell>
                  <TableCell>
                    <a href={`/${project.s_report}`} target="_blank" rel="noopener noreferrer">
                      {project.s_report}
                    </a>
                  </TableCell>
                  <TableCell>{project.s_raw_data}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{project.t_status}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                    
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

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Project</Typography>
          <TextField 
            fullWidth 
            label="Sample Name" 
            name="s_name" 
            value={newProject.s_name} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Test ID</InputLabel>
              <Select
                name="t_id"
                value={newProject.t_id}
                onChange={handleChange}
                label="Test ID"
              >
                {tests.map((test) => (
                  <MenuItem key={test.t_id} value={test.t_id}>
                    {test.t_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton 
              color="primary" 
              onClick={handleOpenTestForm}
              sx={{ 
                bgcolor: '#3f51b5', 
                color: 'white',
                '&:hover': {
                  bgcolor: '#303f9f',
                },
                ml: 1
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Vendor ID</InputLabel>
              <Select
                name="v_id"
                value={newProject.v_id}
                onChange={handleChange}
                label="Vendor ID"
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.v_id} value={vendor.v_id}>
                    {vendor.v_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton 
              color="primary" 
              onClick={handleOpenVendorForm}
              sx={{ 
                bgcolor: '#3f51b5', 
                color: 'white',
                '&:hover': {
                  bgcolor: '#303f9f',
                },
                ml: 1
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Client ID</InputLabel>
              <Select
                name="c_id"
                value={newProject.c_id}
                onChange={handleChange}
                label="Client ID"
              >
                {clients.map((client) => (
                  <MenuItem key={client.c_id} value={client.c_id}>
                    {client.c_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton 
              color="primary" 
              onClick={handleOpenClientForm}
              sx={{ 
                bgcolor: '#3f51b5', 
                color: 'white',
                '&:hover': {
                  bgcolor: '#303f9f',
                },
                ml: 1
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <TextField 
            fullWidth 
            label="Date Received" 
            name="s_date_received" 
            value={newProject.s_date_received} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          <TextField 
            fullWidth 
            label="Report" 
            name="s_report" 
            value={newProject.s_report} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          <TextField 
            fullWidth 
            label="Raw Data" 
            name="s_raw_data" 
            value={newProject.s_raw_data} 
            onChange={handleChange} 
            sx={{ mb: 2 }} 
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isTestFormOpen}
        onClose={handleCloseTestForm}
        aria-labelledby="test-form-modal"
        aria-describedby="add-new-test-form"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          borderRadius: '12px',
          outline: 'none',
        }}>
          <TestForm 
            onSubmit={handleTestFormSubmit}
            onCancel={handleCloseTestForm}
          />
        </Box>
      </Modal>

      <Modal
        open={isVendorFormOpen}
        onClose={handleCloseVendorForm}
        aria-labelledby="vendor-form-modal"
        aria-describedby="add-new-vendor-form"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          borderRadius: '12px',
          outline: 'none',
        }}>
          <VendorForm 
            onSubmit={handleVendorFormSubmit}
            onCancel={handleCloseVendorForm}
          />
        </Box>
      </Modal>

      <Modal
        open={isClientFormOpen}
        onClose={handleCloseClientForm}
        aria-labelledby="client-form-modal"
        aria-describedby="add-new-client-form"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          borderRadius: '12px',
          outline: 'none',
        }}>
          <ClientForm 
            onSubmit={handleClientFormSubmit}
            onCancel={handleCloseClientForm}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CompletePr;