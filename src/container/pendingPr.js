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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete, Warning } from "@mui/icons-material";

const PendingProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = [
        {
          s_id: "609ff9c1-69ba-499d-81e2-833e4b99d4d1",
          s_name: "ABC Sample",
          t_id: "T123",
          s_date_received: "2024-07-01",
          s_report: "Report_01.pdf",
          s_raw_data: "This report contains data of ABC client's sample s1",
        },
      ];
      setProjects(response);
    };
    fetchData();
  }, []);

  const handleOpen = (project = null) => {
    setEditData(project);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editData.s_id) {
      console.log("Updating project:", editData);
    } else {
      setProjects([...projects, { ...editData, s_id: Date.now().toString() }]);
    }
    handleClose();
  };

  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => setOpenDelete(false);

  const handleDeleteConfirm = async () => {
    setProjects(projects.filter((p) => p.s_id !== deleteId));
    setOpenDelete(false);
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
        <Button variant="contained" color="secondary" onClick={() => handleOpen(null)}>
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
                  <a href={`/${project.s_report}`} target="_blank" rel="noopener noreferrer">
                    {project.s_report}
                  </a>
                </TableCell>
                <TableCell>{project.s_raw_data}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(project)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteOpen(project.s_id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editData?.s_id ? "Edit Project" : "Add New Project"}
          </Typography>
          <TextField fullWidth label="Sample Name" name="s_name" value={editData?.s_name || ""} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Test ID" name="t_id" value={editData?.t_id || ""} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Date Received" name="s_date_received" type="date" InputLabelProps={{ shrink: true }} value={editData?.s_date_received || ""} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Report" name="s_report" value={editData?.s_report || ""} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Raw Data" name="s_raw_data" value={editData?.s_raw_data || ""} onChange={handleChange} margin="normal" />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>
          <Warning color="error" /> Are you sure you want to delete this entry?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Yes</Button>
          <Button onClick={handleDeleteClose} color="secondary" variant="outlined">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PendingProjectsPage;
