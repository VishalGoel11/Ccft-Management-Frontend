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
import UploadFileIcon from '@mui/icons-material/UploadFile';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600, // Increased maxWidth to make the card wider
  margin: '16px auto', // Adjusted margin to make the card smaller
  backgroundColor: '#f8fafc',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  borderRadius: '12px',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: '16px', // Adjusted padding to make the container smaller
  backgroundColor: 'white',
  borderRadius: '8px',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    fontSize: '0.875rem', // Decreased font size
    height: '40px', // Decreased height
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
          p: 2, // Adjusted padding to make the box smaller
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>Add New Test</Typography> {/* Adjusted variant to make the text smaller */}
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Test Name"
              name="testName"
              value={testData.testName}
              onChange={handleChange}
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
              required
            />

            <FormControl fullWidth sx={{ mb: 2 }}> {/* Adjusted margin to make the control smaller */}
              <InputLabel sx={{ fontSize: '0.875rem' }}>Test Type</InputLabel>
              <Select
                name="testType"
                value={testData.testType}
                onChange={handleChange}
                label="Test Type"
                required
                sx={{ fontSize: '0.875rem', height: '40px' }} // Decreased font size and height
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
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
            />

            <Box sx={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              gap: 1, // Adjusted gap to make the box smaller
              mt: 3 // Adjusted margin to make the box smaller
            }}>
              <Button
                variant="outlined"
                onClick={onCancel}
                sx={{
                  color: '#3f51b5',
                  borderColor: '#3f51b5',
                  fontSize: '0.875rem', // Decreased font size
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
                  fontSize: '0.875rem', // Decreased font size
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
  testOptions = []
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
    console.log('New test created:', newTest);
    setIsTestFormOpen(false);
  };

  return (
    <StyledCard>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ 
          bgcolor: '#3f51b5', 
          color: 'white', 
          p: 1, // Adjusted padding to make the box smaller
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>
            {isEditMode ? 'Edit Project' : 'Create New Project'}
          </Typography>
        </Box>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            {isEditMode && (
              <StyledTextField
                fullWidth
                label="Project ID"
                name="id"
                value={formData.id || 'Will be generated automatically'}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ 
                  mb: 2, // Adjusted margin to make the field smaller
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
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
              required
            />

            <TestSelectWithAddBtn sx={{ mb: 2 }}> {/* Adjusted margin to make the box smaller */}
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: '0.875rem' }}>Test ID</InputLabel>
                <Select
                  name="t_id"
                  value={formData.t_id}
                  onChange={onChange}
                  label="Test ID"
                  required
                  sx={{ fontSize: '0.875rem', height: '40px' }} // Decreased font size and height
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
              label="Entry Date"
              name="s_entry_date"
              type="date"
              value={formData.s_entry_date}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
              required
            />

            <StyledTextField
              fullWidth
              label="Delivery Date"
              name="s_delivery_date"
              type="date"
              value={formData.s_delivery_date}
              onChange={onChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
              required
            />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StyledTextField
                fullWidth
                label="Report"
                name="s_report"
                value={formData.s_report}
                onChange={onChange}
                sx={{ mr: 2 }} // Adjusted margin to make the field smaller
                required
              />
              <IconButton
                color="primary"
                component="label"
                sx={{
                  bgcolor: '#3f51b5',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#303f9f',
                  },
                }}
              >
                <UploadFileIcon />
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      onChange({
                        target: {
                          name: 's_report',
                          value: file.name,
                        },
                      });
                    }
                  }}
                />
              </IconButton>
            </Box>

            <StyledTextField
              fullWidth
              label="Raw Data"
              name="s_raw_data"
              value={formData.s_raw_data}
              onChange={onChange}
              multiline
              rows={0}
              InputLabelProps={{ shrink: true }} // Ensure the label shrinks
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
              required
            />

            <FormControl fullWidth sx={{ mb: 2 }}> {/* Adjusted margin to make the control smaller */}
              <InputLabel sx={{ fontSize: '0.875rem' }}>Status</InputLabel>
              <Select
                name="t_status"
                value={formData.t_status}
                onChange={onChange}
                label="Status"
                required
                sx={{ fontSize: '0.875rem', height: '40px' }} // Decreased font size and height
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              gap: 1, // Adjusted gap to make the box smaller
              mt: 3 // Adjusted margin to make the box smaller
            }}>
              <Button
                variant="outlined"
                onClick={onCancel}
                sx={{
                  color: '#3f51b5',
                  borderColor: '#3f51b5',
                  fontSize: '0.875rem', // Decreased font size
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
                  fontSize: '0.875rem', // Decreased font size
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
          maxWidth: 400, // Adjusted maxWidth to make the modal smaller
          maxHeight: '60vh', // Adjusted maxHeight to ensure the modal fits within the viewport height
          overflowY: 'auto', // Add scroll if content overflows
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2, // Adjusted padding to make the box smaller
          borderRadius: '12px',
          outline: 'none',
        }}>
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