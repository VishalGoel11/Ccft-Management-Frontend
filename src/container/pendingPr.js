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
  IconButton,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./sidebar";
import TestForm from "./testform";
import VendorForm from "./VendorForm";
import ClientForm from "./ClientForm";
import Swal from "sweetalert2";

const Pendingpr = () => {
  const [projects, setProjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [isTestFormOpen, setIsTestFormOpen] = useState(false);
  const [isVendorFormOpen, setIsVendorFormOpen] = useState(false);
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    s_id: "",
    s_name: "",
    t_id: "",
    v_id: "",
    c_id: "",
    s_date_received: "",
    s_report: "",
    s_raw_data: "",
    t_status: "pending"
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = [
        {
          s_id: "609ff9c1-69ba-499d-81e2-833e4b99d4d1",
          s_name: "ABC Sample",
          t_id: null,
          v_id: "V001",
          c_id: "C001",
          s_date_received: "2024-01-15",
          s_report: "Report_01.pdf",
          s_raw_data: "This report contains data of the test of ABC client's sample s1",
          t_status: "pending"
        },
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
      setProjects(response);
      setTests(testResponse);
      setVendors(vendorResponse);
      setClients(clientResponse);
    };
    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      s_id: "",
      s_name: "",
      t_id: "",
      v_id: "",
      c_id: "",
      s_date_received: "",
      s_report: "",
      s_raw_data: "",
      t_status: "pending"
    });
  };

  const handleConfirmDeleteOpen = (projectId) => {
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
        setProjects(projects.filter(project => project.s_id !== projectId));
        Swal.fire({
          title: "Deleted!",
          text: "The project has been deleted.",
          icon: "success"
        });
        setSnackbarOpen(true);
        setSnackbarMessage("Project deleted successfully.");
      }
    });
  };

  const handleEdit = (project) => {
    setFormData(project);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (data) => {
    if (data.s_id) {
      const updatedProjects = projects.map((project) =>
        project.s_id === data.s_id ? data : project
      );
      setProjects(updatedProjects);
      setSnackbarMessage("Project updated successfully.");
    } else {
      setProjects([...projects, { ...data, s_id: Date.now().toString() }]);
      setSnackbarMessage("New project added successfully.");
    }
    setSnackbarOpen(true);
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
          padding: '20px',
          width: `calc(100% - ${sidebarOpen ? '200px' : '60px'})`, 
          overflowX: 'hidden',
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
          <Typography variant="h6">Pending Projects</Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleOpen}
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
          <Table sx={{ minWidth: 650, fontSize: '0.75rem' }}>
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow key={project.s_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {project.s_id.length > 10 ? `${project.s_id.substring(0, 10)}...` : project.s_id}
                  </TableCell>
                  <TableCell>{project.s_name}</TableCell>
                  <TableCell>{project.t_id || "N/A"}</TableCell>
                  <TableCell>{project.v_id || "N/A"}</TableCell>
                  <TableCell>{project.c_id || "N/A"}</TableCell>
                  <TableCell>{project.s_date_received}</TableCell>
                  <TableCell>
                    <a
                      href={`/${project.s_report}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.s_report}
                    </a>
                  </TableCell>
                  <TableCell>{project.s_raw_data.length > 20 ? `${project.s_raw_data.substring(0, 20)}...` : project.s_raw_data}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(project)}
                      aria-label="edit"
                      sx={{ color: "#2196f3" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleConfirmDeleteOpen(project.s_id)}
                      aria-label="delete"
                      sx={{ color: "#f44336" }}
                    >
                      <DeleteIcon />
                    </IconButton>
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
        <Box sx={{ width: '100%', maxWidth: 600, mx: 2, bgcolor: 'background.paper', boxShadow: 24, p: 2, borderRadius: 2, maxHeight: '80vh', overflowY: 'auto' }}>
          <Box
            sx={{
              backgroundColor: "#3f51b5",
              color: "white",
              p: 2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography variant="h6">
              {formData.s_id ? "Edit Project" : "Add New Project"}
            </Typography>
          </Box>
          <TextField 
            fullWidth 
            label="Sample Name" 
            name="s_name" 
            value={formData.s_name} 
            onChange={handleChange} 
            sx={{ mb: 1 }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Test ID</InputLabel>
              <Select
                name="t_id"
                value={formData.t_id}
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Vendor ID</InputLabel>
              <Select
                name="v_id"
                value={formData.v_id}
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Client ID</InputLabel>
              <Select
                name="c_id"
                value={formData.c_id}
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
            value={formData.s_date_received} 
            onChange={handleChange} 
            sx={{ mb: 1 }} 
          />
          <TextField 
            fullWidth 
            label="Report" 
            name="s_report" 
            value={formData.s_report} 
            onChange={handleChange} 
            sx={{ mb: 1 }} 
          />
          <TextField 
            fullWidth 
            label="Raw Data" 
            name="s_raw_data" 
            value={formData.s_raw_data} 
            onChange={handleChange} 
            sx={{ mb: 1 }} 
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => handleSubmit(formData)}>Submit</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />

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
          p: 2,
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
          p: 2,
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
          p: 2,
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

export default Pendingpr;