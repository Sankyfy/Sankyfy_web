import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, Alert, Box } from '@mui/material';
import axios from 'axios';
import { NavBar2 } from '../../Components/NavBar/NavBar2';
import { NavBar } from '../../Components/NavBar/NavBar';
import { Base_Url } from '../../Configs/BaseUrl';

export const ForgotPass = () => {
  const navigate = useNavigate();

  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [email,setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    
    updatePassword(email,prevPassword,newPassword)
  };

  const updatePassword = async (email, previousPassword, newPassword) => {
    try {
        const response = await axios.post(`${Base_Url}api/user/update-password`, {
            email,
            previousPassword,
            newPassword
        });

        if (response.status === 200) {
            alert('Password updated successfully');
            setPrevPassword('')
            setNewPassword('')
            setConfirmPassword('')
            setEmail('')
            setError('')
            navigate("login");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            alert(error.response.data.message);
        } else {
            alert('Failed to update password');
        }
    }
}

  const handleContactUs = () => {
    navigate('/contact-us');
  };

  return (
  <Box>
    <NavBar2 />
      <Box
        sx={{
          backgroundImage: "linear-gradient(195deg, rgba(66, 66, 74, 0.6), rgba(25, 25, 25, 0.6)),url(./assets/images/bg-sign-in-basic.jpeg)",
          backgroundSize: "cover", // This ensures the image covers the entire Box
          backgroundPosition: "center", // This centers the image within the Box
          width: "100%", // Adjust as needed
          height: "100vh", // Adjust as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity:1,
        
        }}
      >



          <Card sx={{ maxWidth: 400,borderRadius:"20px" }}>
      <CardContent>
      
        <Typography variant="h5" component="div" gutterBottom>
          Forgot Password
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Previous Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={prevPassword}
          onChange={(e) => setPrevPassword(e.target.value)}
        />

        <TextField
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <TextField
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Update Password
        </Button>

        <Typography
          variant="body2"
          
          align="center"
          sx={{ mt: 2, cursor: 'pointer',color:"blue" }}
          onClick={handleContactUs}
        >
         Forgot Previous Password Contact Us !
        </Typography>
      </CardContent>
    </Card>
    
    </Box>
  </Box>
  
  
  );
};
