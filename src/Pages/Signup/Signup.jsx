
import React, { useEffect, useState } from "react";
import { NavBar } from "../../Components/NavBar/NavBar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import "./SignUp.css";
import { NavBar2 } from "../../Components/NavBar/NavBar2";
import Lottie from 'react-lottie';
import animationData from "./Animation - 1716038571450.json"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { Base_Url } from "../../Configs/BaseUrl";
import { isMobile } from "../../IsMobile/IsMobile";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'100vw',
  height:'100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export const Signup = () => {

  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          getAddress(latitude,longitude)
          setError(null);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if(formData.password !== formData.confirmPassword){
      alert("Password mismatch");
      return 
    }
    e.preventDefault();
    try {
      const response = await axios.post(`${Base_Url}api/user/signup`, formData);
      console.log("Data==>",response.data);
      window.location.href = "/login"
    } catch (error) {
      console.log("Error==>",error)
    }
  };








  const navigation =  useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState(null);
 

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handelClick = (path)=>{
    window.location.href=path
      }
  const [location, setLocation] =  useState(null);

  

  const handleMapClick = (event) => {
    console.log("Event ==>",event)
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ lat, lng });
    getAddress(lat, lng);
    // handleClose();
  };

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    map.addListener('click', handleMapClick);
  };

  const getAddress = (lat, lng) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBiT-IQhU-7xJVBPuo7t7v5y38anGc6JCk`;
    
    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          console.log("Adress for geocode api ==>",data.results[0])
          setAddress(data.results[0].formatted_address);
        } else {
          setAddress('Address not found');
        }
      })
      .catch(error => {
        console.error('Error fetching address:', error);
        setAddress('Error fetching address');
      });
  };

 useEffect(() => {
    if (open) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBiT-IQhU-7xJVBPuo7t7v5y38anGc6JCk`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [open]);



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
         {/* <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(128, 128, 128, 0.5)" // Adjust the color and opacity as needed
  }}></div> */}
        <Box style={{width:`${isMobile ? "100%" : "50%"}`}}>
          <Card id="cardSignup" style={{position:"relative"}}>
            <CardContent>
              <Box>
                <Card id="cardSignup2">
                  <CardContent>
                  {
                      !isMobile && <Box style={{position:"absolute",top:10,left: "50%",
                        transform: "translateX(-50%)",}}>
                                      <Box sx={{textAlign:"center",width:"100%"}}>
                                      <Typography
                                        sx={{
                                          color: "#fff",
                                          fontSize: "14px",
                                        }}
                                      >
                                       Are you looking for a good offline store or shop nearby?
                                      </Typography>
                                      </Box>
                                    
                                    </Box>
                    }
                    
                    <Box style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <Box>
                      <Lottie options={defaultOptions} height={170} width={170} />
                      </Box>
                      {/* <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "13px",
                          marginLeft:"-20px"
                          
                        }}
                      >
                        Welcome to Sankyfy! Your journey to seamless experiences starts here
                      </Typography> */}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              
              {/* <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Address" {...a11yProps(1)} />
       
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
      <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "left",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >
                 <Box>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Name"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Email"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Password"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    label="Confirm Password"
                    variant="outlined"
                  />
                </Box>

                
              </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
      <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "left",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box>
                <Button variant="outlined" onClick={getLocation}>Get Current Location</Button>
                  <Button variant="outlined" onClick={handleOpen} sx={{marginLeft:"10px"}}>Select Location On Map</Button>
                  </Box>
                  <Box>
        <Box>
        {location && location.lat && location.lng && (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <p>Address: {address}</p>
        </Box>
        
        </Box>


                
              </Box>
      
      </CustomTabPanel>

    
    </Box> */}
    <Box
                sx={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "left",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >
                 <Box>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Name"
                    variant="outlined"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Email"
                    variant="outlined"
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                  type="password"
                    sx={{ width: "100%" }}
                    label="Password"
                    variant="outlined"
                    name="password" 
                    value={formData.password} 
                  onChange={handleChange} 
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                  type="password"
                    sx={{ width: "100%" }}
                    label="Confirm Password"
                    variant="outlined"
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                  onChange={handleChange}
                  />
                </Box>

                
              </Box>

                  
<Box style={{marginTop:"30px"}}>

<Box sx={{ marginTop: "40px" }}>
    <Button onClick={handleSubmit}  fullWidth variant="contained">
   Sign up
  </Button>
  
 
               
              </Box>

              <Box sx={{ marginTop: "20px" }}>
                <Typography sx={{ color: "#7b809a", fontSize: "13px" }}>
                  Already have an account?{" "}
                  <span
                    style={{
                      color: "#1A73E8",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={()=>handelClick("login")}
                  >
                    Sign in
                  </span>{" "}
                </Typography>
              </Box>

</Box>
            
            </CardContent>
          </Card>
        </Box>

        <Box sx={{position:"absolute",bottom:20}}>
          <Typography sx={{color:"#fff"}}>
            © 2024, Sankyfy. All rights reserved.
          </Typography>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div id="map" style={{width:"100%",height:"80vh"}}></div>

        <div>
          {
            location &&  <span>Location : {location.lat},{location.lng}</span>
          }
          
          <p>Address: {address}</p>
        </div>
        
        <Button variant="contained">Confirm Location</Button>
        <Button sx={{marginLeft:"30px"}} onClick={handleClose} variant="contained">Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};
