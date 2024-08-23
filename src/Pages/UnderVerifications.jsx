import { Button, Typography } from '@mui/material'
import { Box, display, height, maxHeight, width } from '@mui/system'
import { EmailJSResponseStatus } from 'emailjs-com'
import React from 'react'

export const UnderVerifications = () => {
    const handelHomeClick = ()=>{
        window.location.href = "/"
    }
  return (
    <Box sx={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
       <Box sx={{width:"60%",textAlign:"center"}}>
           <Typography sx={{fontSize:"24px",fontWeight:"bold"}}>Account Verification in Progress</Typography>

           <Typography sx={{fontSize:"18px",marginTop:"20px"}}>
           Your account is currently under admin verification, which may take 2-3 days to complete. 
           Once the process is complete, you will receive an email from us with a login link. We appreciate your patience and 
           understanding during this process. Thank you for your cooperation.
          </Typography>

          <Button sx={{marginTop:"30px"}} variant='contained' onClick={handelHomeClick}>Home</Button>
       </Box>
    </Box>
  )
}
