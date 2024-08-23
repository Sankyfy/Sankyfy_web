
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import { Footer } from '../../Components/Footer/Footer'
import { isMobile } from '../../IsMobile/IsMobile'

export const PrivacyPolicy = () => {
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
   <Typography id='title1'>Privacy Policy</Typography>
</Box>
<Box sx={{marginTop:"-190px"}}>
          <Card id="card1">
            <CardContent>
            <Box sx={{marginTop:"60px",marginBottom:"60px"}}>

            <Grid container spacing={4} sx={{ width:`${isMobile ? '100%' : '80%'}`, justifyContent: "center",margin:"auto" }}>
              
            <Grid item xs={12} sm={12} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Information We Collect</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            We may collect information about you in a variety of ways. The information we may 
collect on the Site includes:
Personal Data
Personally identifiable information, such as your name, location, email address, and 
telephone number, and demographic information, such as your age, gender, 
hometown, and interests, that you voluntarily give to us when you register with the 
Site, or when you choose to participate in various activities related to the Site, such 
as online chat and message boards.
Derivative Data
Information our servers automatically collect when you access the Site, such as your 
IP address, your browser type, your operating system, your access times, and the 
pages you have viewed directly before and after accessing the Site.
Mobile Device Data
Device information, such as your mobile device ID, model, and manufacturer, and 
information about the location of your device, if you access the Site from a mobile 
device.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box>
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Use of Your Information</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            Having accurate information about you permits us to provide you with a smooth, 
efficient, and customized experience. Specifically, we may use information collected 
about you via the Site to:
* Create and manage your account.
* Using your live location to find nearby stores around you.
* Enable user-to-user communications.
* Generate a personal profile about you to make future visits to the Site more 
personalized.
* Increase the efficiency and operation of the Site.
* Monitor and analyze usage and trends to improve your experience with the 
Site.
* Notify you of updates to the Site.
* Offer new products, services, and/or recommendations to you.
* Perform other business activities as needed.
* Prevent fraudulent transactions, monitor against theft, and protect against 
criminal activity.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box>
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Disclosure of Your Information</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            We may share information we have collected about you in certain situations. Your 
information may be disclosed as follows:
By Law or to Protect Rights
If we believe the release of information about you is necessary to respond to legal 
process, to investigate or remedy potential violations of our policies, or to protect 
the rights, property, and safety of others, we may share your information as 
permitted or required by any applicable law, rule, or regulation.
Third-Party Service Providers
We may share your information with third parties that perform services for us or on 
our behalf, including payment processing, data analysis, email delivery, hosting 
services, customer service, and marketing assistance.
Marketing Communications
With your consent, or with an opportunity for you to withdraw consent, we may 
share your information with third parties for marketing purposes, as permitted by 
law.
Business Transfers
We may share or transfer your information in connection with, or during negotiations 
of, any merger, sale of company assets, financing, or acquisition of all or a portion of 
our business to another company.
Affiliates
We may share your information with our affiliates, in which case we will require those 
affiliates to honor this Privacy Policy. Affiliates include our parent company and any 
subsidiaries, joint venture partners, or other companies that we control or that are 
under common control with us.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>
          

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Security of Your Information</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            We use administrative, technical, and physical security measures to help protect your 
personal information. While we have taken reasonable steps to secure the personal 
information you provide to us, please be aware that despite our efforts, no security 
measures are perfect or impenetrable, and no method of data transmission can be 
guaranteed against any interception or other types of misuse.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Your Privacy Rights</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            Depending on your location, you may have the following rights regarding your 
personal data:
* The right to access – You have the right to request copies of your personal 
data.
* The right to rectification – You have the right to request that we correct any 
information you believe is inaccurate or complete information you believe is 
incomplete.
* The right to erasure – You have the right to request that we erase your 
personal data, under certain conditions.
* The right to restrict processing – You have the right to request that we restrict 
the processing of your personal data, under certain conditions.
* The right to object to processing – You have the right to object to our 
processing of your personal data, under certain conditions.
* The right to data portability – You have the right to request that we transfer 
the data that we have collected to another organization, or directly to you, 
under certain conditions.
            </Typography>
            </Box>
           

            </Box>
           
            </Grid>


            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Contact Us</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            If you have questions or comments about this Privacy Policy, please contact us at:
            <br/>
sankyfy.com
<br/>
email: sankyfy@gmail.com
<br/>
phone: 9901450678
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
