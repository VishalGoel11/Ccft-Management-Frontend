import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";

const UserModal = ({ open, onClose, onSubmit, editUser }) => {
  const [userData, setUserData] = useState({
    name: "",
    full_address: "",
    gst: "",
    poc: "",
    phone_number: "",
    arrival_date: "",
    departure_date: "",
  });

  useEffect(() => {
    if (editUser) {
      setUserData(editUser);
    } else {
      setUserData({
        name: "",
        full_address: "",
        gst: "",
        poc: "",
        phone_number: "",
        arrival_date: "",
        departure_date: "",
      });
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
        <TextField label="Full Address *" name="full_address" fullWidth margin="dense" variant="outlined" value={userData.full_address} onChange={handleChange} />
        <TextField label="GST *" name="gst" fullWidth margin="dense" variant="outlined" value={userData.gst} onChange={handleChange} />
        <TextField label="POC *" name="poc" fullWidth margin="dense" variant="outlined" value={userData.poc} onChange={handleChange} />
        <TextField label="Phone Number *" name="phone_number" fullWidth margin="dense" variant="outlined" value={userData.phone_number} onChange={handleChange} />
        <TextField label="Arrival Date *" name="arrival_date" type="date" fullWidth margin="dense" variant="outlined" value={userData.arrival_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField label="Departure Date *" name="departure_date" type="date" fullWidth margin="dense" variant="outlined" value={userData.departure_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">CANCEL</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">{editUser ? "UPDATE" : "CREATE"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
