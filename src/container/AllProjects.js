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
} from "@mui/material";

const AllProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    s_name: "",
    t_id: "",
    s_date_received: "",
    s_report: "",
    s_raw_data: "",
  });

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
          c_id: null,
        },
      ];
      setProjects(response);
    };
    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setProjects([...projects, { s_id: Date.now(), ...newProject }]);
    setNewProject({ s_name: "", t_id: "", s_date_received: "", s_report: "", s_raw_data: "" });
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
        <Typography variant="h6">All Projects</Typography>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
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
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Project</Typography>
          <TextField fullWidth label="Sample Name" name="s_name" value={newProject.s_name} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Test ID" name="t_id" value={newProject.t_id} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Date Received" name="s_date_received" value={newProject.s_date_received} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Report" name="s_report" value={newProject.s_report} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Raw Data" name="s_raw_data" value={newProject.s_raw_data} onChange={handleChange} sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AllProjectsPage;
