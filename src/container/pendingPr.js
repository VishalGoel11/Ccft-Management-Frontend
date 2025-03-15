import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  styled,
  Tooltip,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProjectForm from './Form';
import Sidebar from "./sidebar";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocalStorage, handleHttpRequest, handleRefresh } from "../api/utility/Utility";
import { addSample, API_BASE_URL, deleteSample, getAllClient, getAllSample, getAllTest } from "../api/const/api-url";

import RefreshIcon from '@mui/icons-material/Refresh';

const StyledRefreshIcon = styled(RefreshIcon)({
  fontSize: '40px',
  color: 'white',
  cursor: 'pointer',
});

const AllProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  let [clients, setClients] = useState(null);
    let [tests, setTests] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const navigate = useState();
  const [formData, setFormData] = useState({
    id: "",
    s_name: "",
    t_id: "",
    c_id:"",
    s_date_received: "",
    s_delivery_date: "",
    s_report: "",
    s_raw_data: "",
    t_status: "new"
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
      // const fetchData = async () => {
         const token = getLocalStorage();
              const fetchProject = async() => {
                 if(token !== null){
                    const response = await handleHttpRequest("GET",getAllSample,{},true,token);
                    const pendingpr = response.data.filter((project)=>project.t_status==='Pending')
                    setProjects(pendingpr);
                    // console.log(response.status);
                 }else{
                  navigate("/");
                 }
              }
              fetchProject();
            // };
        
        const fetchTestData = async () => {
            try {
              const token = getLocalStorage();
              if (token === null) {
                navigate("/")
              }
              const response = await handleHttpRequest("GET", getAllTest, "", true, token);
              if (response.status === 202) {
                setTests(tests = response.data);
                // console.log(tests)
              } else {
                console.log('------------Error----------');
              }
            } catch (error) {
              console.log(error);
            }
          };
          fetchTestData();
          // console.log(clients)
          // console.log(tests)
  
     const fetchClientData = async () => {
           try {
             const token = getLocalStorage();
             if (token === null) {
               navigate("/");
             }
             const response = await handleHttpRequest("GET", getAllClient, "", true, token);
             if (response.status === 202) {
              //  console.log(response.data)
               setClients(response.data);
               
             } else {
               console.log('------------Error----------');
             }
           } catch (error) {
             console.log(error);
           }
         };
         fetchClientData();
     
    }, []);

  const getRowColor = (status) => {
    switch (status) {
      case 'C':
        return '#e8f5e9';
      case 'pending':
        return '#FFC0CB';
      case 'new':
        return '#e3f2fd';
      default:
        return 'transparent';
    }
  };

  const handleOpen = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({
        id: `P${Math.floor(Math.random() * 900) + 100}`,
        s_name: "",
        t_id: "",
        s_entry_date: "",
        s_delivery_date: "",
        s_report: "",
        s_raw_data: "",
        t_status: "new"
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setFormData({
      id: "",
      s_name: "",
      t_id: "",
      s_entry_date: "",
      s_delivery_date: "",
      s_report: "",
      s_raw_data: "",
      t_status: "new"
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (data) => {
    if (editingProject) {
      alert("Under Devlopment.")
      // setProjects(projects.map(p => 
      //   p.s_id === editingProject.s_id ? { ...p, ...data } : p
      // ));
      // toast.success("Project updated successfully!");
    } else {
      const token = getLocalStorage();
            if(token === null){
              navigate('/')
            }else{
              console.log(data);
              const addEntity= async(data) => {
                const response = await handleHttpRequest("POST",addSample,data,true,token,true);
                if(response.status===202){
                  alert("Project added successfully!");
                }else{
                  alert("Something went worong");
                }
              }
              addEntity(data);
            }
    }
    handleClose();
  };

  const handleDelete = (s_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // setProjects(projects.filter(project => project.s_id !== s_id));
        const deleteEntity = async(id) => {
            const token = getLocalStorage();
            if(token!=null){
              const response = await handleHttpRequest("DELETE",deleteSample,{"id":id},true,token);
              if(response.status===202){
                alert("Sample Deleted Succesfully.")
              }else{
                alert("Something went wrong.")
              }
            }
        }
        deleteEntity(s_id);
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "The project has been deleted.",
        //   icon: "success"
        // });
        // toast.info("Project deleted successfully!");
      }
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: 'margin 0.3s',
          marginLeft: sidebarOpen ? '200px' : '60px', 
          padding: '10px',
          width: `calc(100% - ${sidebarOpen ? '200px' : '60px'})`, 
          overflowX: 'auto',
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#3f51b5",
            color: "white",
            p: 4,
            borderRadius: 1,
          }}
        >
          <div style={{display:'flex', gap:'7px',alignItems:'center'}}>
          <Tooltip title="Refresh">
            <Button onClick={()=>{handleRefresh()}}>
              <StyledRefreshIcon/>
            </Button>
          </Tooltip>
          <Typography variant="h6" style={{fontSize:'30px'}}>Pending Sample</Typography>
          </div>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => handleOpen()}
            sx={{
              backgroundColor: "#f50057",
              '&:hover': {
                backgroundColor: "#c51162"
              }
            }}
          >
            ADD NEW
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#eeeeee" }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Sample Name</TableCell>
                <TableCell>Test ID</TableCell>
                <TableCell>Entry Date</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Report</TableCell>
                <TableCell>Raw Data</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow 
                  key={project.s_id}
                  sx={{ 
                    backgroundColor: getRowColor(project.t_status),
                    '&:hover': {
                      filter: 'brightness(0.95)'
                    }
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.s_id}</TableCell>
                  <TableCell>{project.s_name}</TableCell>
                  <TableCell>{project.t_id || "N/A"}</TableCell>
                  <TableCell>{project.s_date_received}</TableCell>
                  <TableCell>{project.s_delivery_date!=null?project.s_delivery_date:"N/A"}</TableCell>
                  <TableCell>
                    <a href={`${API_BASE_URL}/pdf/${project.s_report}${'.pdf'}`} target="_blank" rel="noopener noreferrer">
                      {project.s_report}
                    </a>
                  </TableCell>
                  <TableCell>{project.s_raw_data}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{project.t_status!=null?project.t_status:"N/A"}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {/* <EditIcon 
                        sx={{ cursor: 'pointer', color: '#2196f3' }} 
                        onClick={() => handleOpen(project)}
                      /> */}
                      <DeleteIcon 
                        sx={{ cursor: 'pointer', color: '#f44336' }} 
                        onClick={() => handleDelete(project.s_id)}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal 
        open={open} 
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 600, mx: 2 }}>
          <ProjectForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isEditMode={!!editingProject}
            clients={clients}
            tests={tests}

          />
        </Box>
      </Modal>
      <ToastContainer />
    </Box>
  );
};

export default AllProjectsPage;