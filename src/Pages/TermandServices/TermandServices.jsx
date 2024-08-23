
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import { Footer } from '../../Components/Footer/Footer'
import { isMobile } from '../../IsMobile/IsMobile'

export const TermandServices = () => {
  return (
    <Box>
<NavBar />

<Box sx={{
        backgroundImage: 'linear-gradient(195deg, rgba(66, 66, 74, 0.6), rgba(25, 25, 25, 0.6)),url(./assets/images/bg-about-us.jpg)',
        backgroundSize: 'cover', // This ensures the image covers the entire Box
        backgroundPosition: 'center', // This centers the image within the Box
        width: '100%', // Adjust as needed
        minHeight: '75vh', // Adjust as needed
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}>
   <Typography id='title1'>Terms and Services</Typography>
</Box>
<Box sx={{marginTop:"-190px"}}>
          <Card id="card1">
            <CardContent>
            <Box sx={{marginTop:"60px",marginBottom:"60px"}}>

            <Grid container spacing={4} sx={{ width:`${isMobile ? '100%' : '80%'}`, justifyContent: "center",margin:"auto" }}>
              
            <Grid item xs={12} sm={12} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Introduction</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            Welcome to Sankyfy.com. The Website is owned and operated by Sankyfy.com 
management. By accessing or using the Website, you agree to comply with and be 
bound by these Terms and Services . If you do not agree to these Terms, please do 
not use the Website.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box>
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Definitions</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            * Shopkeeper: A business or individual who registers on the Website to offer 
goods or services for sale.
* Customer: An individual or entity who wants goods or services from a 
Shopkeeper through the help of a Website to find there nearby stores as per 
there need.
* User: Any individual or entity accessing or using the Website, including both 
Shopkeepers and Customers.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box>
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>User Accounts</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            Registration
* To use certain features of the Website, Users must create an account by 
providing accurate and complete information.
* Users are responsible for maintaining the confidentiality of their account 
information and for all activities that occur under their account.
3.2 Account Login
* Users must login to the website after registering on to the registration page
with the same credentials as mentioned on the registration while registering.

         </Typography>
            </Box>
           

            </Box>
           
            </Grid>
          

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Services Provided</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            For Shopkeepers
* Shopkeepers can create and manage listings for their goods or services on the 
Website.
* Shopkeepers are responsible for ensuring that their listings are accurate, 
complete, and comply with all applicable laws.
4.2 For Customers
* Customers can browse and see all the goods or services availabel through the 
Website.
* Customer can visit to the nearby stores as per required by taking the help of 
the website.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Refunds and Returns</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            * Refunds and returns are subject to the policies of the respective Shopkeeper. 
Customers should refer to the Shopkeeper's terms for details.
            </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>User Conduct</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            * Users agree to use the Website in compliance with all applicable laws and 
regulations.
* Users agree not to engage in any activity that may harm the Website, other 
Users, or third parties.
            </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Intellectual Property</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            * All content on the Website, including but not limited to text, graphics, logos, 
and software, is the property of Sankyfy.com or its licensors and is protected 
by intellectual property laws.
* Users may not use, reproduce, or distribute any content from the Website 
without our express written permission.
            </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Limitation of Liability</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            * We are not liable for any direct, indirect, incidental, or consequential damages 
arising from the use of the Website.
* We do not guarantee the accuracy, completeness, or reliability of any content 
or listings on the Website.
            </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Dispute Resolution</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            * Users agree to resolve any disputes through binding arbitration or mediation 
as agreed upon by the parties.
            </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Amendments</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            * We reserve the right to modify these Terms at any time. Any changes will be 
effective immediately upon posting on the Website.
* Continued use of the Website following any changes constitutes acceptance 
of the new Terms.
            </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Contact Information</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            * If you have any questions or concerns about these Terms, please contact us at 
            mail
            </Typography>
            </Box>
           

            </Box>
           
            </Grid>
           

           

 </Grid>


</Box>
              
            </CardContent>
          </Card>
        </Box>



<Box sx={{marginTop:"30px"}}>
        <Footer/>
        </Box>
    </Box>
  )
}
