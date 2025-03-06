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
  maxWidth: 500,
  margin: '0 auto',
  backgroundColor: '#f8fafc',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  borderRadius: '12px',
});

const FormContainer = styled(Box)({
  padding: '16px',
  backgroundColor: 'white',
  borderRadius: '8px',
  maxHeight: '70vh',
  overflowY: 'auto',
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
            p: 2,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <Typography variant="h6">
            {isEditMode ? 'Edit Client' : 'Create New Client'}
          </Typography>
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* Client ID field - only visible in edit mode, non-editable */}
            {isEditMode && (
              <StyledTextField
                fullWidth
                label="Client ID"
                name="c_id"
                value={localFormData.c_id || 'Will be generated automatically'}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ 
                  mb: 2,
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#666",
                  }
                }}
                size="small"
                disabled
              />
            )}
            
            <StyledTextField
              fullWidth
              label="Client Name"
              name="c_name"
              value={localFormData.c_name || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
              size="small"
              required
            />

            <StyledTextField
              fullWidth
              label="Address"
              name="c_full_address"
              value={localFormData.c_full_address || ''}
              onChange={handleChange}
              multiline
              rows={2}
              sx={{ mb: 2 }}
              size="small"
              required
            />

            <StyledTextField
              fullWidth
              label="GST Number"
              name="c_gst"
              value={localFormData.c_gst || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
              size="small"
              required
            />

            <StyledTextField
              fullWidth
              label="Point of Contact"
              name="c_poc"
              value={localFormData.c_poc || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
              size="small"
              required
            />

            <StyledTextField
              fullWidth
              label="Phone Number"
              name="c_phone_number"
              type="tel"
              value={localFormData.c_phone_number || ''}
              onChange={handleChange}
              sx={{ mb: 2 }}
              size="small"
              required
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <StyledTextField
                label="Arrival Date"
                name="c_received_date"
                type="date"
                value={localFormData.c_received_date || ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                size="small"
                required
                sx={{ flex: 1 }}
              />

              <StyledTextField
                label="Delivery Date"
                name="c_delivery_date"
                type="date"
                value={localFormData.c_delivery_date || ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                size="small"
                required
                sx={{ flex: 1 }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2,
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
                size="small"
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
                size="small"
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