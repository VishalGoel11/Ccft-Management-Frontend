import React, { useState } from 'react';
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
  IconButton,
  Modal,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Import your actual TestForm component
// import TestForm from './TestForm';

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

const TestSelectWithAddBtn = styled(Box)({
  display: 'flex',
  gap: '8px',
  alignItems: 'flex-start',
  width: '100%',
});

// Mock TestForm component with matching styles to ProjectForm
const TestForm = ({ onSubmit, onCancel }) => {
  const [testData, setTestData] = useState({
    testName: '',
    testType: '',
    testDescription: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      id: `test-${Date.now()}`, 
      name: testData.testName, 
      type: testData.testType,
      description: testData.testDescription 
    });
  };

  return (
    <StyledCard sx={{ m: 0, width: '100%' }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ 
          bgcolor: '#3f51b5', 
          color: 'white', 
          p: 3, 
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}>
          <Typography variant="h5">Add New Test</Typography>
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Test Name"
              name="testName"
              value={testData.testName}
              onChange={handleChange}
              sx={{ mb: 3 }}
              required
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Test Type</InputLabel>
              <Select
                name="testType"
                value={testData.testType}
                onChange={handleChange}
                label="Test Type"
                required
              >
                <MenuItem value="type1">Type 1</MenuItem>
                <MenuItem value="type2">Type 2</MenuItem>
                <MenuItem value="type3">Type 3</MenuItem>
              </Select>
            </FormControl>

            <StyledTextField
              fullWidth
              label="Test Description"
              name="testDescription"
              value={testData.testDescription}
              onChange={handleChange}
              multiline
              rows={3}
              sx={{ mb: 3 }}
            />

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
                Add Test
              </Button>
            </Box>
          </form>
        </FormContainer>
      </CardContent>
    </StyledCard>
  );
};

const ProjectForm = ({ 
  formData, 
  onSubmit, 
  onChange, 
  onCancel,
  isEditMode = false,
  testOptions = [] // Array of available test options
}) => {
  const [isTestFormOpen, setIsTestFormOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleOpenTestForm = () => {
    setIsTestFormOpen(true);
  };

  const handleCloseTestForm = () => {
    setIsTestFormOpen(false);
  };

  const handleTestFormSubmit = (newTest) => {
    // Here you would save the new test to your backend
    // and then update your local state with the new test
    console.log('New test created:', newTest);
    setIsTestFormOpen(false);
    
    // Ideally, you'd refresh the test options list
    // or add the new test to your options and select it
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
            {/* ID field - only visible in edit mode, non-editable */}
            {formData.id && (
              <StyledTextField
                fullWidth
                label="Project ID"
                name="id"
                value={formData.id || 'Will be generated automatically'}
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
              label="Sample Name"
              name="s_name"
              value={formData.s_name}
              onChange={onChange}
              sx={{ mb: 3 }}
              required
            />

            {/* Test ID as dropdown with add button */}
            <TestSelectWithAddBtn sx={{ mb: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Test ID</InputLabel>
                <Select
                  name="t_id"
                  value={formData.t_id}
                  onChange={onChange}
                  label="Test ID"
                  required
                >
                  {testOptions.map((test) => (
                    <MenuItem key={test.id} value={test.id}>
                      {test.name || test.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton 
                color="primary" 
                onClick={handleOpenTestForm}
                sx={{ 
                  bgcolor: '#3f51b5', 
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#303f9f',
                  },
                  mt: 1
                }}
              >
                <AddIcon />
              </IconButton>
            </TestSelectWithAddBtn>

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

      {/* Test Form Modal */}
      <Modal
        open={isTestFormOpen}
        onClose={handleCloseTestForm}
        aria-labelledby="test-form-modal"
        aria-describedby="add-new-test-form"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          borderRadius: '12px',
          outline: 'none',
        }}>
          {/* Replace this with your actual TestForm component import */}
          <TestForm 
            onSubmit={handleTestFormSubmit}
            onCancel={handleCloseTestForm}
          />
        </Box>
      </Modal>
    </StyledCard>
  );
};

export default ProjectForm;