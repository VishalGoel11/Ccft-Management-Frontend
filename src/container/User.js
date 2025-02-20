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
import UserModal from "./userModal";

const User = () => {
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joined: "2023-05-12" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Pending", joined: "2023-06-15" },
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
      // Update existing user
      setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...userData } : u)));
    } else {
      // Add new user
      setUsers([...users, { ...userData, id: users.length + 1, joined: new Date().toISOString().split("T")[0] }]);
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
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joined Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.joined}</TableCell>
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
