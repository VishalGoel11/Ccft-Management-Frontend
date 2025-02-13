import React from 'react';
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

const TestForm = ({
  formData = {}, // Ensure formData is always an object
  onSubmit,
  onChange,
  onCancel,
  isEditMode = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
            {isEditMode ? 'Edit Test' : 'Create New Test'}
          </Typography>
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Test Name"
              name="t_name"
              value={formData.t_name || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="t_status"
                value={formData.t_status || ''}
                onChange={onChange}
                label="Status"
                required
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </Select>
            </FormControl>

            <StyledTextField
              fullWidth
              label="Protocol"
              name="t_protocol"
              value={formData.t_protocol || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Update"
              name="t_update"
              value={formData.t_update || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Masked Report"
              name="t_masked_report"
              value={formData.t_masked_report || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
              Vendor Information
            </Typography>

            <StyledTextField
              fullWidth
              label="Vendor Name"
              name="vendor.v_name"
              value={formData.vendor?.v_name || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Vendor POC"
              name="vendor.v_poc"
              value={formData.vendor?.v_poc || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Vendor Address"
              name="vendor.v_add"
              value={formData.vendor?.v_add || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Phone"
              name="vendor.phone"
              value={formData.vendor?.phone || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Vendor GST"
              name="vendor.v_gst"
              value={formData.vendor?.v_gst || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Date Added"
              name="vendor.v_date_added"
              value={formData.vendor?.v_date_added || ''}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

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

export default TestForm;
