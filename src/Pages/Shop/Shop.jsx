import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import { Footer } from '../../Components/Footer/Footer'
import { OurServicesCard } from '../../Components/Cards/OurServicesCard'
import { StoreCards } from '../../Components/Cards/StoreCards'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Base_Url } from '../../Configs/BaseUrl'
import axios from 'axios'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.65),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '92ch',
      },
    },
  },
}));



export const Shop = () => {
   const [ShopData,setShopData] = useState([]);

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${Base_Url}api/shop`);
  
      if (response.status === 200) {
        const fetchedCategories = response.data.data;
        console.log("Data ==>",fetchedCategories)
        setShopData(fetchedCategories);
       
      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  useEffect(()=>{
    fetchShops()
  },[])

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
        alignItems:"center",
        position:"relative",
        flexDirection:"column"
      }}>
       
      

       <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"20px"}}>
          
          <Button variant='contained' sx={{color:"black",background:"#fff",  '&:hover': {
          color: "#fff",
        }}}>Select Category</Button>

          <Button variant='contained'  sx={{color:"black",background:"#fff",marginLeft:"20px",  '&:hover': {
          color: "#fff",
        }}}>Select Pincode</Button>

          <Button variant='contained' sx={{color:"black",background:"#fff",marginLeft:"20px",  '&:hover': {
          color: "#fff",
        }}}>Select State</Button>

          <Button variant='contained' sx={{color:"black",background:"#fff",marginLeft:"20px",  '&:hover': {
          color: "#fff",
        }}}>Select City</Button>


          
       </Box>
      
       <Box sx={{marginTop:"30px"}}>
      <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

      </Box>
        
        

        
     
</Box>
<Box sx={{marginTop:"-60px"}}>
          <Card id="card1">
            <CardContent>

          
            
             

              <Box sx={{width:"80%",margin:"auto"}}>
               
              <Box sx={{marginTop:"60px"}}>
                <Box sx={{marginTop:"30px"}}>
                  <Typography sx={{fontSize:"2.25rem",fontWeight:"bold"}}>Shops</Typography>
                  <Typography sx={{color:"#7b809a",fontSize:"1.25rem",marginTop:"10px"}}>Each of these shops has been selected for their quality, uniqueness, and dedication to providing an <br/> exceptional shopping experience. Dive in and discover your next favorite store</Typography>
                </Box>

                <Box sx={{marginTop:"60px"}}>
                <Grid  container spacing={2}>
                  {
                    ShopData && ShopData.map((el,index)=>{
                     return<Grid item xs={12} sm={6} md={4}>
                      <StoreCards data={el}/>
                    </Grid>
                    })
                  }
      
       
      </Grid>
                </Box>
           
               </Box>

               

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
