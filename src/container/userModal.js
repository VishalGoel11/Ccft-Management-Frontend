import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  DialogActions,
} from "@mui/material";

const UserModal = ({ open, onClose, onSubmit, editUser }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    password: "",
  });

  useEffect(() => {
    if (editUser) {
      setUserData(editUser);
    } else {
      setUserData({ name: "", email: "", role: "User", status: "Active", password: "" });
    }
  }, [editUser]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(userData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle style={{ background: "#3f51b5", color: "#fff" }}>
        {editUser ? "Edit User" : "Create New User"}
      </DialogTitle>
      <DialogContent>
        <TextField label="Full Name *" name="name" fullWidth margin="dense" variant="outlined" value={userData.name} onChange={handleChange} />
        <TextField label="Email *" name="email" type="email" fullWidth margin="dense" variant="outlined" value={userData.email} onChange={handleChange} />
        <TextField select label="Role *" name="role" fullWidth margin="dense" variant="outlined" value={userData.role} onChange={handleChange}>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </TextField>
        <TextField select label="Status *" name="status" fullWidth margin="dense" variant="outlined" value={userData.status} onChange={handleChange}>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </TextField>
        {!editUser && <TextField label="Password *" name="password" type="password" fullWidth margin="dense" variant="outlined" value={userData.password} onChange={handleChange} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">CANCEL</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{editUser ? "UPDATE" : "CREATE"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
