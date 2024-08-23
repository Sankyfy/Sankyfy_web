import React, { useState } from "react";
import { NavBar } from "../../Components/NavBar/NavBar";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import "./Login.css";
import { NavBar2 } from "../../Components/NavBar/NavBar2";
import Lottie from 'react-lottie';
import animationData from "./Animation - 1716038571450.json"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../Configs/BaseUrl";
import { isMobile } from "../../IsMobile/IsMobile";
import { SnackBarAlert } from "../../Components/Snackbar/SnackBarAlert";
import { Visibility, VisibilityOff } from '@mui/icons-material';
export const Login = () => {
  const navigation =  useNavigate()
  const [formData, setFormData] = useState({

    email: '',
    password: '',

  });
  const [open, setOpen] = useState(false);
  const[Message,setMessage] = useState("");
  const [varient,setVarient] = useState("success");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handelShopLogin =()=>{
    navigation("/signup-shopkeeper")
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(`${Base_Url}api/user/login`, formData);
      console.log("login Data==>",response.data);
      const Data = response.data.data
      localStorage.setItem("userDetails",JSON.stringify(Data));
      localStorage.setItem("auth",true);

      window.location.href = "/";
      setMessage("Login Successfully ")
      setVarient("success")
      setOpen(true);
    } catch (error) {
      console.log("Error==>",error);
      // alert("Login Error")
      setMessage("Invalid email or password. Please try again.")
      setVarient("error")
      setOpen(true);
     
    }
  };
  
    const handelClick = (path)=>{
      window.location.href=path
        }
const handelforgotClick = ()=>{
  navigation("/forgotpass")
  }
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
         <SnackBarAlert setOpen={setOpen} open={open} msg={Message} vairent={varient} />
         {/* <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(128, 128, 128, 0.5)" // Adjust the color and opacity as needed
  }}></div> */}
        <Box style={{width:`${isMobile ? "100%" : "50%"}`}}>
          <Card id={isMobile ? '' : "cardLogin"} style={{position:"relative"}}>
            <CardContent>
            <Box>
                <Card id="cardLogin2">
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
              
             
               <Box sx={{textAlign:"left",marginTop:"10px"}}>
                <Typography sx={{fontSize:"14px"}}>Are you shop owner ? <span onClick={handelShopLogin} style={{color:"#1976d2",cursor: 'pointer'}}>Login</span></Typography>
               </Box>
              <Box
                sx={{
                  marginTop: "20px",
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
                    label="Email"
                    variant="outlined"
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                   <TextField
        sx={{ width: '100%' }}
        type={showPassword ? 'text' : 'password'}
        label="Password"
        variant="outlined"
        name="password"
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
                </Box>

<Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center", marginTop: "20px",}}>
<Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                   
                  }}
                >
                  <Switch defaultChecked />
                  <Typography sx={{ color: "#7b809a", fontSize: "14px" }}>
                    Rember me
                  </Typography>
                </Box>
<Box onClick={handelforgotClick} >
 <span style={{color:"blue",cursor:"pointer"}}>Forgot Password ?</span> 
</Box>
</Box>
                
              </Box>

              <Box sx={{ marginTop: "40px" }}>
                <Button onClick={handleSubmit} fullWidth variant="contained">
                  sign in
                </Button>
              </Box>

              <Box sx={{ marginTop: "20px" }}>
                <Typography sx={{ color: "#7b809a", fontSize: "13px" }}>
                  Don't have an account?{" "}
                  <span
                    style={{
                      color: "#1A73E8",
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={()=>handelClick("/signup")}
                  >
                    Sign up
                  </span>{" "}
                </Typography>
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
    </Box>
  );
};
