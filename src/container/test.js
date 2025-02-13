import React, { useState, useEffect } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TestForm from "./testform";
import Sidebar from "./sidebar";

const Test = () => {
  const [tests, setTests] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = [
        {
          t_id: "631b227e-ff88-426d-b88b-21929f59b5ee",
          t_status: "Pending",
          t_name: "ABC Test",
          t_protocol: "Https",
          t_update: "Updated",
          t_masked_report: "Test.pdf",
          vendor: {
            v_id: "aef82a75-ed07-496d-8084-676acd29ae04",
            v_name: "PQR Vendor",
            v_poc: "34567dfghj",
            v_add: "345678fghj",
            phone: "8979003126",
            v_gst: "5678fghjk",
            v_date_added: "32-01-2025",
          },
        },
      ];
      setTests(response);
    };
    fetchData();
  }, []);

  const handleOpen = (test = null) => {
    setEditingTest(test);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTest(null);
  };

  const handleSubmit = (data) => {
    if (editingTest) {
      setTests(
        tests.map((t) => (t.t_id === editingTest.t_id ? { ...t, ...data } : t))
      );
    } else {
      setTests([...tests, { t_id: Date.now().toString(), ...data }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setTests(tests.filter((test) => test.t_id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? "200px" : "60px",
          padding: "10px",
          width: `calc(100% - ${sidebarOpen ? "200px" : "60px"})`,
          overflowX: "auto",
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
          <Typography variant="h6">All Tests</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleOpen()}
            sx={{
              backgroundColor: "#f50057",
              "&:hover": {
                backgroundColor: "#c51162",
              },
            }}
          >
            ADD NEW TEST
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Test Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Protocol</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Masked Report</TableCell>
                <TableCell>Vendor Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test, index) => (
                <TableRow key={test.t_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{test.t_name}</TableCell>
                  <TableCell>{test.t_status}</TableCell>
                  <TableCell>{test.t_protocol}</TableCell>
                  <TableCell>{test.t_update}</TableCell>
                  <TableCell>{test.t_masked_report}</TableCell>
                  <TableCell>{test.vendor.v_name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <EditIcon
                        sx={{ cursor: "pointer", color: "#2196f3" }}
                        onClick={() => handleOpen(test)}
                      />
                      <DeleteIcon
                        sx={{ cursor: "pointer", color: "#f44336" }}
                        onClick={() => handleDelete(test.t_id)}
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 600, mx: 2 }}>
          <TestForm
            testData={editingTest}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Test;
