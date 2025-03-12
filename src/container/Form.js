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
  IconButton,
  Modal,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { getLocalStorage, handleHttpRequest } from '../api/utility/Utility';
import { getAllClient, getAllTest } from '../api/const/api-url';
import { useNavigate } from 'react-router-dom';

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
    console.log()
    onSubmit(testData);
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
  // onChange, 
  onCancel,
  isEditMode = false,
  clients = [],
  tests = []
}) => {
  const [isTestFormOpen, setIsTestFormOpen] = useState(false);
  // const [data,setData]  = useState(formData);
  const [s_id,setSId]= useState(formData.s_id);
  const [s_name,setSName]= useState(formData.s_name);
  const [s_date_received,setSDateReceived]= useState(formData.s_date_received);
  const [s_delivery_date,setSDeliveryDate]= useState(formData.s_delivery_date);
  const [s_raw_data,setSRawdata]= useState(formData.s_raw_data);
  const [s_report,setSReport]= useState(formData.s_report);
  const [t_status,setTStatus]= useState(formData.t_status);
  const [c_name,setCName]= useState(formData.c_name);
  const [t_name,setTName]= useState(formData.t_name);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Data -> ",data);
    const payload = new FormData();
    payload.append("s_id", s_id);
    payload.append("c_name", c_name);
    payload.append("s_name", s_name);
    payload.append("s_date_received", s_date_received);
    payload.append("s_report", s_report); // Appending file directly
    payload.append("s_raw_data", s_raw_data);
    payload.append("t_name", t_name);
    payload.append("t_status", t_status);
    payload.append("s_delivery_date", s_delivery_date);
    console.log("Payload -> ",payload);
    // for (let pair of payload.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    onSubmit(payload);
  };
  
  // const onChange = (e)=>{
  //     setData({...data,[e.target.name]:e.target.value})
  //     // console.log(data);
  // }

  const handleOpenTestForm = () => {
    setIsTestFormOpen(true);
  };

  const handleCloseTestForm = () => {
    setIsTestFormOpen(false);
  };


  const handleTestFormSubmit = (newTest) => {
    // console.log('New test created:', newTest);
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
                name="s_id"
                value={s_id || 'Will be generated automatically'}
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
              value={s_name}
              onChange={(e)=>setSName(e.target.value)}
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
              required
            />
            
            <TestSelectWithAddBtn sx={{ mb: 2 }}> {/* Adjusted margin to make the box smaller */}
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: '0.875rem' }}>Test Name</InputLabel>
                <Select
                  name="t_name"
                  value={t_name}
                  onChange={(e)=>setTName(e.target.value)}
                  label="Test ID"
                  required
                  sx={{ fontSize: '0.875rem', height: '40px' }} // Decreased font size and height
                >
                  {tests!=null?tests.map((test) => (
                    <MenuItem key={test.t_name} value={test.t_name}>
                      {test.t_name || test.t_id}
                    </MenuItem>
                  )):<MenuItem >
                </MenuItem>}
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

            <TestSelectWithAddBtn sx={{ mb: 2 }}> {/* Adjusted margin to make the box smaller */}
              <FormControl fullWidth>
                <InputLabel sx={{ fontSize: '0.875rem' }}>Client Name</InputLabel>
                <Select
                  name="c_name"
                  value={c_name}
                  onChange={(e)=>setCName(e.target.value)}
                  label="Client ID"
                  required
                  sx={{ fontSize: '0.875rem', height: '40px' }} // Decreased font size and height
                >
                  {clients.map((test) => (
                    <MenuItem key={test.c_name} value={test.c_name}>
                      {test.c_name || test.c_id}
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
              value={s_date_received}
              onChange={(e)=>setSDateReceived(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
              required
            />

            <StyledTextField
              fullWidth
              label="Delivery Date"
              name="s_delivery_date"
              type="date"
              value={s_delivery_date}
              onChange={(e)=>setSDeliveryDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }} // Adjusted margin to make the field smaller
              required
            />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StyledTextField
                fullWidth
                label="Report"
                name="s_report"
                value={s_report}
                onChange={(e)=>setSReport(e.target.value)}
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
                  // value={}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSReport(file);
                    }
                  }}
                />
              </IconButton>
            </Box>

            <StyledTextField
              fullWidth
              label="Raw Data"
              name="s_raw_data"
              value={s_raw_data}
              onChange={(e)=>setSRawdata(e.target.value)}
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
                value={t_status}
                onChange={(e)=>setTStatus(e.target.value)}
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