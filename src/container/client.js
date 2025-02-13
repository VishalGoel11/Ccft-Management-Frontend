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
import ClientForm from "./ClientForm";
import Sidebar from "./sidebar";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = [
        {
          id: "acfb3f88-65f3-4f78-bedd-2ba10734df37",
          c_name: "XYZ Laboratory",
          c_full_address: "ABC Building Floor 6th Modinagar(201201) Ghz.",
          c_gst: "234rt567ghj789",
          c_poc: "dfg5678hjio789",
          c_phone_number: "8979003126",
          c_date: "Jan 30, 2025, 21:41",
        },
      ];
      setClients(response);
    };
    fetchData();
  }, []);

  const handleOpen = (client = null) => {
    setEditingClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingClient(null);
  };

  const handleSubmit = (data) => {
    if (editingClient) {
      setClients(
        clients.map((c) => (c.id === editingClient.id ? { ...c, ...data } : c))
      );
    } else {
      setClients([...clients, { id: Date.now().toString(), ...data }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setClients(clients.filter((client) => client.id !== id));
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
          <Typography variant="h6">All Clients</Typography>
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
            ADD NEW CLIENT
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Client Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>POC</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client, index) => (
                <TableRow key={client.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{client.c_name}</TableCell>
                  <TableCell>{client.c_full_address}</TableCell>
                  <TableCell>{client.c_gst}</TableCell>
                  <TableCell>{client.c_poc}</TableCell>
                  <TableCell>{client.c_phone_number}</TableCell>
                  <TableCell>{client.c_date}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <EditIcon
                        sx={{ cursor: "pointer", color: "#2196f3" }}
                        onClick={() => handleOpen(client)}
                      />
                      <DeleteIcon
                        sx={{ cursor: "pointer", color: "#f44336" }}
                        onClick={() => handleDelete(client.id)}
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
          <ClientForm
            clientData={editingClient}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Client;
