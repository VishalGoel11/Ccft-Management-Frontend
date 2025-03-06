import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
} from '@mui/material';

const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: '32px auto',
  backgroundColor: '#f8fafc',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  borderRadius: '12px',
});

const FormContainer = styled(Box)({
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
});

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

const ClientForm = ({
  formData = {}, // Ensure formData is always an object
  onSubmit,
  onChange,
  onCancel,
  isEditMode = false,
}) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (onChange) {
      onChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localFormData);
  };

  return (
    <StyledCard>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            bgcolor: '#3f51b5',
            color: 'white',
            p: 3,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <Typography variant="h5">
            {isEditMode ? 'Edit Client' : 'Create New Client'}
          </Typography>
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* ID field - only visible in edit mode, non-editable */}
            {localFormData.id && (
              <StyledTextField
                fullWidth
                label="Client ID"
                name="id"
                value={localFormData.id || 'Will be generated automatically'}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ 
                  mb: 3,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#666",
                  }
                }}
                disabled
              />
            )}
            
            <StyledTextField
              fullWidth
              label="Client Name"
              name="client_name"
              value={localFormData.client_name || ''}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Client Email"
              name="client_email"
              type="email"
              value={localFormData.client_email || ''}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Client Phone"
              name="client_phone"
              type="tel"
              value={localFormData.client_phone || ''}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Company Name"
              name="company_name"
              value={localFormData.company_name || ''}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Address"
              name="client_address"
              value={localFormData.client_address || ''}
              onChange={handleChange}
              multiline
              rows={3}
              sx={{ mb: 3 }}
              required
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="client_status"
                value={localFormData.client_status || ''}
                onChange={handleChange}
                label="Status"
                required
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="suspended">Suspended</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                variant="outlined"
                onClick={onCancel}
                sx={{
                  color: '#3f51b5',
                  borderColor: '#3f51b5',
                  '&:hover': {
                    borderColor: '#303f9f',
                    backgroundColor: 'rgba(63, 81, 181, 0.04)',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#3f51b5',
                  '&:hover': {
                    bgcolor: '#303f9f',
                  },
                }}
              >
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </Box>
          </form>
        </FormContainer>
      </CardContent>
    </StyledCard>
  );
};

export default ClientForm;