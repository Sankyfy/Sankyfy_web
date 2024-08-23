import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import { Footer } from '../../Components/Footer/Footer'
import { isMobile } from '../../IsMobile/IsMobile'

export const AboutUs = () => {
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
   <Typography id='title1'>About us</Typography>
</Box>
<Box sx={{marginTop:"-190px"}}>
          <Card id="card1">
            <CardContent>
            <Box sx={{marginTop:"60px",marginBottom:"60px"}}>

            <Grid container spacing={4} sx={{ width:`${isMobile ? '100%' : '80%'}`, justifyContent: "center",margin:"auto" }}>
              
            <Grid item xs={12} sm={12} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Welcome to Sankyfy: Your Vibrant Community Marketplace</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            At Sankyfy, we are dedicated to creating a dynamic and engaging marketplace that brings together local artisans, 
            food vendors, and small businesses. Our mission is to foster a thriving community where everyone can connect, 
            discover unique products, and enjoy a sense of community spirit. We believe in the power of
             local economies and are passionate about revitalizing the traditional market experience with a modern twist.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box>
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Our Vision</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            Our vision at Sankyfy is to create a space that embodies the spirit of community and the essence of local culture. 
            We aim to provide a platform where vendors and shoppers alike can come together to celebrate and support local craftsmanship 
            and entrepreneurship. By curating a selection of high-quality, locally-sourced goods, 
            we strive to make every visit to Sankyfy a unique and enriching experience.

            We envision Sankyfy as more than just a market; it's a place where stories are shared, connections are made, 
            and the community thrives. Our goal is to support local businesses, contribute to the local economy, and provide a space where people 
            can come together to enjoy the vibrant atmosphere of an offline market.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box>
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>What We Offer</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            Diverse Vendors: Our market features a wide array of vendors, from fresh produce and handmade 
            crafts to delicious food and unique collectibles. Each vendor brings their best to the table, 
            ensuring that there is always something new and exciting to discover at Sankyfy.


            Support for Local Businesses: We are committed to helping small businesses grow and thrive.
             By providing a platform for local vendors, we contribute to the local economy and foster a sense of community. Our marketplace is 
            a space where local entrepreneurs can showcase their products, reach new customers, and build lasting relationships.


            Unique Shopping Experience: At Sankyfy, we offer more than just a shopping destination.
             We provide an experience that blends the charm of traditional markets with the vibrancy of a modern community hub. Whether you are searching for fresh produce, one-of-a-kind crafts, 
            or simply looking to spend a day immersed in a lively market atmosphere, Sankyfy has something for everyone.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>
          

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Why Choose Sankyfy?</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            Community Focused: Our marketplace is built around the idea of community. We believe that by supporting local businesses, we can create a stronger, more connected community. At Sankyfy, you are not just a customer; you are a part of our family.

Quality and Variety: We pride ourselves on offering a curated selection of high-quality products. Our vendors are passionate about what they do, and it shows in the products they bring to our market. From farm-fresh produce to artisan crafts, you can trust that you are getting the best at Sankyfy.

Engaging Atmosphere: The vibrant atmosphere of our markets is what sets us apart. With live music, food tastings, and special events, there is always something happening at Sankyfy. It's a place where you can come to shop, relax, and enjoy the company of others.
         </Typography>
            </Box>
           

            </Box>
           
            </Grid>

            <Grid item xs={12} sm={6} md={12}  > 
            <Box sx={{textAlign:"left"}}>
            <Box >
              <Typography sx={{fontSize:"30px",fontWeight:"bold"}}>Join Us at Sankyfy</Typography>
            </Box>
            <Box sx={{marginTop:"10px"}}>
            <Typography>
            Whether you are a vendor looking to showcase your products or a shopper in search of unique finds and fresh produce, 
            Sankyfy welcomes you. Come and experience the vibrant atmosphere of our offline markets, support local businesses, 
            and be part of a thriving community. Discover the charm of Sankyfy
             today and see why we are your go-to destination for engaging and dynamic market experiences.
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
