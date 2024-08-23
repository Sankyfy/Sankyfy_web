import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import { Footer } from '../../Components/Footer/Footer'
import emailjs from 'emailjs-com';
import "./ContactUs.css"
import { isMobile } from '../../IsMobile/IsMobile';
export const ContactUs = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    message: '',
    mobile:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
  // if(userDetails){
  if(formValues.email === ''){
    alert("Email is required");
    return
  }
  if(formValues.mobile === ''){
    alert("Mobile is required");
    return
  }
  if(formValues.fullName === ''){
    alert("Name is required");
    return
  }
    const templateParams = {
      user_name: formValues.fullName,
      user_email: formValues.email,
      message: formValues.message,
    };
    console.log("data ==>",templateParams)

    emailjs.send('service_kdf9dmb', 'template_ip144in', {
      to_name: "sankyfy",
      from_name: formValues.fullName + `(${formValues.email})`,
      message: formValues.message + `By ${formValues.mobile}` ,
      },'99P-9lUmJKrK2CC-V')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormValues({
          fullName: '',
          email: '',
          message: ''
        })
        alert('Email sent successfully');
      }, (error) => {
        console.log('FAILED...', error);
        alert('Error sending email');
      });
  // }

  // else{
  //   alert("Login Please");
  // }

  
  };

  return (
    <Box>
      <NavBar />

      <Box sx={{
        marginTop:"150px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:"100px"

      }}>
        <Box sx={{width:`${isMobile ? '80%' : "70%"}`}}>
            <Box sx={{paddingTop:"20px",width:"100%"}}>
            <Grid container spacing={2}  >

            <Grid item xs={12} sm={12} md={6} sx={{padding:"10px"}}>
          <Box style={{borderRadius:"10px",height:"500px",padding:"20px",display:"flex",flexDirection:"column"}} > 
             <Box sx={{textAlign:"left"}}>
              <img src='./assets/images/contactus1.jpeg' style={{height:"200px",width:"200px"}} />
             </Box>
             <Box sx={{textAlign:"left",marginTop:"30px"}}>
             <Typography sx={{fontSize:"18px"}}>
              We look forward to welcoming you to Sankyfy and sharing in the joy of community and local commerce!
             </Typography>
             </Box>
             
             <Box sx={{textAlign:"left",marginTop:"30px"}}>
              <Typography sx={{fontSize:"16px"}}>Email : <span>sankyfy@gmail.com</span></Typography>
              
             </Box>

             <Box sx={{textAlign:"left",marginTop:"30px"}}>
              <Typography sx={{fontSize:"16px"}}>Phone :  <span>9901450678</span></Typography>
             
             </Box>
             
          

            

           </Box>
        </Grid>


            <Grid item xs={12} sm={12} md={6} sx={{padding:"10px"}}>
        <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          opacity:1,
        
        }}
      >
     
        <Box  sx={{position:"relative"}}>
          <Card id="cardContactus">
            <CardContent>
              <Box>
                <Card id="cardContactus2">
                  <CardContent>
                    <Box style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                      <Box sx={{marginLeft:"20px"}}>
                     
                     
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "32px",
                          marginLeft:"-20px",
                          fontWeight:"bold"
                        }}
                      >
                        Contact us
                      </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              <Box
                sx={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "left",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box sx={{textAlign:"left",marginTop:"20px"}}>
                    <Typography sx={{fontSize:"14px"}}>For further questions, including partnership opportunities, please email sankyfy@gmail.com or contact using our contact form.</Typography>
                </Box>
                <Box sx={{marginTop:"40px"}}>
                <Grid container spacing={2} >
        <Grid item xs={12} sm={6} md={6} >
        <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Full Name"
                    variant="standard"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleChange}
                  />
            </Grid>

            <Grid item xs={12} sm={6} md={6} >
        <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Mobile"
                    variant="standard"
                    name='mobile'
                    value={formValues.mobile}
          onChange={handleChange}
                  />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
        <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Email"
                    variant="standard"
                    name='email'
                    value={formValues.email}
          onChange={handleChange}
                  />
            </Grid>

          


            <Grid item xs={12} sm={12} md={12} >
                <Box sx={{marginTop:"50px"}}>
                <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="What can we help you ?"
                    minRows={3}
                    variant="standard"
                    name='message'
                    value={formValues.message}
                    onChange={handleChange}
                    multiline
                  />
                </Box>
       
            </Grid>
            </Grid>
                 
                </Box>
             

               
              </Box>

              <Box sx={{ marginTop: "60px" }}>
                <Button  onClick={handleSubmit} variant="contained" sx={{borderRadius:"20px"}}>
                  Send Message
                </Button>
              </Box>

            </CardContent>
          </Card>
        </Box>

      </Box>
        </Grid>


       

        

       
      
       
            </Grid>
            </Box>
       
        </Box>
      
      </Box>

      <Box sx={{marginTop:"30px"}}>
        <Footer/>
        </Box>
    </Box>
  )
}
