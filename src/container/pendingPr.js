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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ProjectForm from './Form';

// Styled components from your form
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '32px auto',
  backgroundColor: '#f8fafc',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  borderRadius: '12px',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '&:hover fieldset': {
      borderColor: '#3f51b5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3f51b5',
    },
  },
});

const Pendingpr = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [formData, setFormData] = useState({
    s_id: "",
    s_name: "",
    t_id: "",
    s_date_received: "",
    s_report: "",
    s_raw_data: "",
    t_status: "pending"
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = [
        {
          s_id: "609ff9c1-69ba-499d-81e2-833e4b99d4d1",
          s_name: "ABC Sample",
          t_id: null,
          s_date_received: "ABC building 7th Floor Modinagar(201204) Ghaziabad",
          s_report: "Report_01.pdf",
          s_raw_data: "This report contains data of the test of ABC client's sample s1",
          t_status: "pending"
        },
      ];
      setProjects(response);
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
      s_date_received: "",
      s_report: "",
      s_raw_data: "",
      t_status: "pending"
    });
  };

  const handleConfirmDeleteOpen = (projectId) => {
    setConfirmDeleteOpen(true);
    setDeleteProjectId(projectId);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
    setDeleteProjectId(null);
  };

  const handleDelete = () => {
    const updatedProjects = projects.filter(
      (project) => project.s_id !== deleteProjectId
    );
    setProjects(updatedProjects);
    setConfirmDeleteOpen(false);
    setDeleteProjectId(null);
    setSnackbarOpen(true);
    setSnackbarMessage("Project deleted successfully.");
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
      // Edit existing project
      const updatedProjects = projects.map((project) =>
        project.s_id === data.s_id ? data : project
      );
      setProjects(updatedProjects);
      setSnackbarMessage("Project updated successfully.");
    } else {
      // Add new project
      setProjects([...projects, { ...data, s_id: Date.now().toString() }]);
      setSnackbarMessage("New project added successfully.");
    }
    setSnackbarOpen(true);
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#3f51b5",
          color: "white",
          p: 2,
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
        <Table>
          <TableHead sx={{ backgroundColor: "#eeeeee" }}>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Sample Name</TableCell>
              <TableCell>Test ID</TableCell>
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
                <TableCell>{project.s_name}</TableCell>
                <TableCell>{project.t_id || "N/A"}</TableCell>
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
                <TableCell>{project.s_raw_data}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(project)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleConfirmDeleteOpen(project.s_id)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal with ProjectForm */}
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
            isEditMode={!!formData.s_id}
          />
        </Box>
      </Modal>

      {/* Confirmation Dialog for Delete */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={handleConfirmDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {projects.find(project => project.s_id === deleteProjectId)?.s_name || 'this project'}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success Message */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Pendingpr;