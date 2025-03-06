import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const UserModal = ({ open, handleClose, user, handleUserSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        id: "",
        email: "",
        role: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserSubmit(formData);
  };

  return (
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
        <Box
          sx={{
            bgcolor: '#3f51b5',
            color: 'white',
            p: 2,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            mb: 2,
          }}
        >
          <Typography variant="h6">
            {user ? 'Edit User' : 'Add User'}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          {formData.id && (
            <TextField
              fullWidth
              label="User ID"
              name="id"
              value={formData.id}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mb: 2 }}
            />
          )}
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {user ? "Update" : "Create"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;