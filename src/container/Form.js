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

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '32px auto',
  backgroundColor: '#f8fafc',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  borderRadius: '12px',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
}));

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

const ProjectForm = ({ 
  formData, 
  onSubmit, 
  onChange, 
  onCancel,
  isEditMode = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StyledCard>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ 
          bgcolor: '#3f51b5', 
          color: 'white', 
          p: 3, 
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}>
          <Typography variant="h5">
            {isEditMode ? 'Edit Project' : 'Create New Project'}
          </Typography>
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Sample Name"
              name="s_name"
              value={formData.s_name}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Test ID"
              name="t_id"
              value={formData.t_id}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Date Received"
              name="s_date_received"
              type="date"
              value={formData.s_date_received}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Report"
              name="s_report"
              value={formData.s_report}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            <StyledTextField
              fullWidth
              label="Raw Data"
              name="s_raw_data"
              value={formData.s_raw_data}
              onChange={onChange}
              multiline
              rows={3}
              sx={{ mb: 3 }}
              required
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Status</InputLabel>
              <Select
                name="t_status"
                value={formData.t_status}
                onChange={onChange}
                label="Status"
                required
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              gap: 2, 
              mt: 4 
            }}>
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

export default ProjectForm;