import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserModal from './userModal';

const User = () => {
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      full_address: "123 Main St, NY",
      gst: "12345ABC",
      poc: "Manager",
      phone_number: "123-456-7890",
      arrival_date: "2024-07-01",
      departure_date: "2024-07-10",
    },
    {
      id: 2,
      name: "Jane Smith",
      full_address: "456 Elm St, CA",
      gst: "98765XYZ",
      poc: "Supervisor",
      phone_number: "987-654-3210",
      arrival_date: "2024-08-01",
      departure_date: "2024-08-05",
    },
  ]);

  const handleOpen = (user = null) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
  };

  const handleUserSubmit = (userData) => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...userData } : u)));
    } else {
      setUsers([...users, { ...userData, id: users.length + 1 }]);
    }
    handleClose();
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h6" style={{ background: "#3f51b5", color: "#fff", padding: "10px", borderRadius: "5px" }}>
        All Users
      </Typography>

      <TableContainer component={Paper} style={{ marginTop: "10px" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Full Address</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>POC</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Arrival Date</TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.full_address}</TableCell>
                <TableCell>{user.gst}</TableCell>
                <TableCell>{user.poc}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.arrival_date}</TableCell>
                <TableCell>{user.departure_date}</TableCell>
                <TableCell>
                  <Button size="small" color="primary" onClick={() => handleOpen(user)}>
                    <EditIcon />
                  </Button>
                  <Button size="small" color="error">
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" color="secondary" style={{ marginTop: "10px", float: "right" }} onClick={() => handleOpen()}>
        ADD NEW USER
      </Button>

      <UserModal open={open} onClose={handleClose} onSubmit={handleUserSubmit} editUser={editUser} />
    </div>
  );
};

export default User;
