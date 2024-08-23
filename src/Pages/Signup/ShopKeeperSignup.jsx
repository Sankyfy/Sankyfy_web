

import React, { useEffect, useState } from "react";
import { NavBar } from "../../Components/NavBar/NavBar";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
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
export const ShopKeeperSignup = () => {

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
    mobile: '',
    password: '',
    aadharOrPAN: '',
    fssaiLicense: '',
    gstinNumber: '',
    businessPanCardNumber: '',
    companyName: '',
    status: false,
    images: [],
});
const [AdharorPanImage,setAdharorPanImage] = useState(null);
const [GetCertificateImage,setGetCertificateImage] = useState(null);
const [GstPanImage,setGstPanImage] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log("Data==>",formData)
    // if(formData.password !== formData.confirmPassword){
    //   alert("Password mismatch");
    //   return 
    // }
    e.preventDefault();
    const formData1 = new FormData();
       
    formData1.append('name', formData.name);
    formData1.append('email', formData.email);
    formData1.append('mobile', formData.mobile);
    formData1.append('password', formData.password);
    formData1.append('aadharOrPAN', formData.aadharOrPAN);
    formData1.append('fssaiLicense', formData.fssaiLicense);
    formData1.append('gstinNumber', formData.gstinNumber);
    formData1.append('businessPanCardNumber', formData.businessPanCardNumber);
    formData1.append('companyName', formData.companyName);
    formData1.append('images', AdharorPanImage);
    formData1.append('images', GetCertificateImage);
    formData1.append('images', GstPanImage);

    try {
      const response = await axios.post(`${Base_Url}api/shopkeeper`, formData1);
      console.log("Data==>",response.data);
      // setUpdated((prev)=>prev+1);
      alert("Signup complete")
      window.location.href = "/verify"

    } catch (error) {
      console.log("Error==>",error)
    }
  };

  const handleFileChange3 = (e) => {
    setAdharorPanImage(e.target.files[0]);
  };

  const handleFileChange4 = (e) => {
    setGetCertificateImage(e.target.files[0]);
  };

  const handleFileChange5 = (e) => {
    setGstPanImage(e.target.files[0]);
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
    window.location.href="https://sankyfy-shopkeeper-admin.vercel.app/auth";
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

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
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
              
              <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange2} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Business Details" {...a11yProps(1)} />
          <Tab label="Uplode Images" {...a11yProps(2)} />
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
                 
                    sx={{ width: "100%" }}
                    label="Mobile"
                    variant="outlined"
                    name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
              
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
                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Aadhar or PAN"
                name="aadharOrPAN"
                value={formData.aadharOrPAN}
                onChange={handleChange}
                required
                fullWidth
             
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="FSSAI License"
                name="fssaiLicense"
                value={formData.fssaiLicense}
                onChange={handleChange}
                fullWidth
             
            />
                </Box>

              

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="GSTIN Number"
                name="gstinNumber"
                value={formData.gstinNumber}
                onChange={handleChange}
                required
                fullWidth
              
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Business PAN Card Number"
                name="businessPanCardNumber"
                value={formData.businessPanCardNumber}
                onChange={handleChange}
                required
                fullWidth
             
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                fullWidth
              
            />
                </Box>


                
              </Box>
      
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
      <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "left",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >
             
             <Box sx={{marginTop:"10px"}}>
                <div style={{ display: "flex",justifyContent:"space-between", alignItems: "center" }}>

                <Grid container spacing={3} sx={{ width: "100%", justifyContent: "left", alignItems: "center",marginTop:"20px" }}>
           

           <Grid item xs={12} sm={6} md={3} >
           <div style={{textAlign:"left"}}>
                     <div>
                     <span>Adhar or Pan Image</span>
                      </div> 
                      {
                        AdharorPanImage && <div style={{display: "flex", alignItems: "center",justifyContent:"left" }}>
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            border: "1px solid #ddd",
                            background: `url(${URL.createObjectURL(AdharorPanImage)}) center/cover no-repeat`,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                         
                        >
                        
                        </div>
                        </div>
                      }
                      
                      
                      <input  type='file'    onChange={handleFileChange3} id="noborder" />
        
                    </div>
            </Grid>

            <Grid item xs={12} sm={6} md={3}  >
            <div style={{textAlign:"left"}} >
                    <div>
                     <span>Gst Certificate Image</span>
                      </div> 
                      {
                        GetCertificateImage && <div style={{display: "flex", alignItems: "center",justifyContent:"left" }}>
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            border: "1px solid #ddd",
                            background: `url(${URL.createObjectURL(GetCertificateImage)}) center/cover no-repeat`,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          
                        >
                         
                        </div>
                        </div>
                      }
                    
                      <input  type='file'    onChange={handleFileChange4} id="noborder" />
                    </div>
</Grid>

<Grid item xs={12} sm={6} md={3}  >
     

<div style={{textAlign:"left"}}>
                    <div>
                     <span>Gst Pan Image</span>
                      </div> 
                      {
                        GstPanImage && <div style={{display: "flex", alignItems: "center",justifyContent:"left" }}>
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            border: "1px solid #ddd",
                            background: `url(${URL.createObjectURL(GstPanImage)}) center/cover no-repeat`,
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          
                        >
                         
                        </div>
                        </div>
                      }
                    
                      <input  type='file'    onChange={handleFileChange5} id="noborder" />
                    </div>
</Grid>
            </Grid>
                  

              
                  </div>
                </Box>
               

                
              </Box>
      
      </CustomTabPanel>

    
    </Box>
   

                  
<Box style={{marginTop:"30px"}}>

<Box sx={{ marginTop: "40px" }}>
  {
    value ===0 && <Button onClick={(e)=>{handleChange2(e,1)}}  fullWidth variant="contained">
    Next
   </Button>
  }
  {
    value === 1 && <Button onClick={(e)=>{handleChange2(e,2)}}  fullWidth variant="contained">
    Next
   </Button>
  }

{
    value === 2 && <Button onClick={handleSubmit}  fullWidth variant="contained">
    Sign up
   </Button>
  }
    
  
 
               
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
{
  !isMobile &&   <Box sx={{position:"absolute",bottom:20}}>
  <Typography sx={{color:"#fff"}}>
    © 2024, Sankyfy. All rights reserved.
  </Typography>
</Box>
}
       
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
