import { TextField, Button, Box, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  width: "100vw",
  backgroundColor: "#f5f5f5",
  padding: "20px", 
});

const LoginBox = styled(Paper)({
  width: "100%",
  maxWidth: "400px", 
  padding: "20px",
  textAlign: "center",
  borderRadius: "8px",
  "@media (min-width: 768px)": {
    maxWidth: "600px", 
  },
});

const Header = styled(Box)({
  backgroundColor: "#f8d7da",
  padding: "10px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "18px",
});

const SubmitButton = styled(Button)({
  backgroundColor: "#ff9800",
  color: "white",
  "&:hover": {
    backgroundColor: "#e68900",
  },
  marginTop: "10px",
});


const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard"); 
  };
  return (
    <LoginContainer>
      <LoginBox elevation={3}>
        <Header >Login</Header>
        <Box display="flex" flexDirection="column" alignItems="center" padding="20px">
          <TextField label="User Name" variant="outlined" size="small" fullWidth margin="dense" />
          <TextField label="Password" type="password" variant="outlined" size="small" fullWidth margin="dense" />
          <SubmitButton variant="contained" fullWidth onClick={handleLogin}>
            Submit
          </SubmitButton>
        </Box>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;
