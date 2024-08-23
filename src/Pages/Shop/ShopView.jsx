import { Box, Card, CardContent, Grid, Typography, useScrollTrigger,Button,Modal, TextField,Select,MenuItem,FormControl,
  InputLabel,
  Avatar, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavBar } from '../../Components/NavBar/NavBar'
import { Footer } from '../../Components/Footer/Footer'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../../Configs/BaseUrl';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';
import { isMobile } from '../../IsMobile/IsMobile';

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"20px",
  p: 4,
};

export const ShopView = () => {
  const {id} = useParams();
  const navigation = useNavigate()
  const [shopData,setShopData] = useState(null);
  const [shopFeedbackData,setShopFeedbackData] = useState(null);
  const auth = localStorage.getItem("auth") || false;
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
  const [open2, setOpen2] = useState(false);
  const [formData, setFormData] = useState({
    experience: '',
    feedback: ''
  });
  const [update,setUpdate] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOpen2 = () => {
  if(userDetails){
    setOpen2(true)
    return;
  }
   

    alert("Please login to provide feedback about shop")
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${Base_Url}api/shop/${id}`);
  
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

  const fetchShopsFeedback = async () => {
    try {
      const response = await axios.get(`${Base_Url}api/feedback/shop/${id}`);
  
      if (response.status === 200) {
        const fetchedCategories = response.data;
        console.log("Feed Back   Data ==>",fetchedCategories)
        setShopFeedbackData(fetchedCategories);
       
      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handelFeedbackSubmit = async () => {
    try {
      const data = {
        experience: formData.experience,
        feedbackMessage:formData.feedback,
        userId:userDetails._id,
        shopId:id
      }
      const response = await axios.post(`${Base_Url}api/feedback`,data);
  
      if (response.status === 201) {
        const fetchedCategories = response.data.data;
        console.log("Data ==>",fetchedCategories)
        setUpdate((prev)=>prev+1);
        setFormData({
        experience: '',
        feedback: ''
      })
        handleClose2()
       
      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const initMap = async() => {
    const map = await new window.google.maps.Map(document.getElementById('map2'), {
      center: { lat:shopData.lat, lng:shopData.lng },
      zoom: 10,
    });

    const markerIcon = {
      url: 'https://vectorified.com/images/google-maps-marker-icon-38.png', // Replace with your custom marker image URL
      scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
    };

    new window.google.maps.Marker({
      position: { lat: shopData.lat, lng: shopData.lng },
      map: map,
      icon: markerIcon,
    });
  };

  const handleDirectionClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${shopData.lat},${shopData.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const incrementShopViews = async (shopId) => {
    try {
        const response = await axios.patch(`${Base_Url}api/shop/${shopId}/views`);
        console.log('Updated Shop:', response.data);
    } catch (error) {
        console.error('Error incrementing shop views:', error);
    }
};

  const handelChatus = ()=>{
    if(userDetails){
        window.location.href = `chat/${shopData.shopkeeperId._id}`
        return
    }

    alert("Please Login to chat with store owner")
    
  }


  useEffect(() => {
     if(shopData){
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
  }, [shopData]);


  useEffect(()=>{
    fetchShops()
  },[])

  useEffect(() => {
    // Increment views when the component is mounted
    if(id){
      incrementShopViews(id);
    }

}, [id]);


  useEffect(()=>{
    fetchShopsFeedback()
  },[update])

  return (
     <Box>
                <NavBar />
                <Box  sx={{
        width: '100%', // Adjust as needed
        
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}>
           <Swiper style={{padding:"0px"}} 
    modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
    autoplay={{ delay: 2000 }}
    >
         {
       shopData && shopData.images.map((el,index)=>{
            return <SwiperSlide key={index} >
                    
                      
                      <img src={`${Base_Url}api/${el.path}`} style={{width:"100%",height:"500px",borderRadius:"8px",}} alt="img"/>
                   
                 </SwiperSlide>
        })
       }
    </Swiper>
        </Box>
             
                  

                   <Box >
          <Card id="card1">
            <CardContent>

             <Box sx={{marginTop:"40px"}}>
             <Box className={isMobile ? "" : 'sw'} >
              <Box>
              <Box sx={{marginTop:"30px"}}>
                  <Typography sx={{fontSize:"3.25rem",fontWeight:"bold"}}>Shop Details</Typography>
                </Box>

                <Box sx={{marginTop:"30px"}}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
           <Box sx={{border:"1px solid #344767",borderRadius:"20px",height:"400px",overflow:"auto",padding:"20px",display:"flex",justifyContent:"left",alignItems:"start",flexDirection:"column"}}>
               <Box sx={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                <Box sx={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                 <StoreIcon/>
                 
                </Box>
                <Box sx={{marginLeft:"10px"}}>
                <Typography>{shopData && shopData.shopName}</Typography>
                </Box>
                
               </Box>

               <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"20px"}}>
                <Box sx={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                 <CategoryIcon/>
                 <Typography sx={{marginLeft:"5px"}}>Category :</Typography>
                </Box>
                <Box sx={{marginLeft:"10px"}}>
                <Typography>{shopData && shopData.shopCategory}</Typography>
                </Box>
                
               </Box>

               <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"20px"}}>
                <Box sx={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                 <CallIcon/>
                 <Typography sx={{marginLeft:"5px"}}>Mobile :</Typography>
                </Box>
                <Box sx={{marginLeft:"10px"}}>
                <Typography>{shopData && shopData.mobileNumber}</Typography>
                </Box>
                
               </Box>

               <Box sx={{display:"flex",marginTop:"20px"}}>
                <Box sx={{display:"flex"}}>
                 <AddIcCallIcon/>
                 <Typography sx={{marginLeft:"5px"}}>Alternative Mobile Number :</Typography>
                </Box>
                <Box sx={{marginLeft:"10px"}}>
                <Typography>{shopData && shopData.alternativeNumber}</Typography>
                </Box>
                
               </Box>

               <Box sx={{display:"flex",marginTop:"20px"}}>
                <Box sx={{display:"flex"}}>
                 <MailIcon/>
                 <Typography sx={{marginLeft:"5px"}}>Email:</Typography>
                </Box>
                <Box sx={{marginLeft:"10px"}}>
                <Typography>{shopData && shopData.emailId}</Typography>
                </Box>
                
               </Box>



               <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"20px"}}>
                <Box sx={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                 <LocationCityIcon/>
                 <Typography sx={{marginLeft:"5px"}}>City :</Typography>
                </Box>
                <Box sx={{marginLeft:"10px"}}>
                <Typography>{shopData && shopData.city}</Typography>
                </Box>
                
               </Box>

               <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"20px"}}>
                <Box sx={{display:"flex",justifyContent:"left",alignItems:"center"}}>
                 <EmojiTransportationIcon/>
                 <Typography sx={{marginLeft:"5px"}}>State :</Typography>
                </Box>
                <Box sx={{marginLeft:"10px"}}>
                <Typography>{shopData && shopData.state}</Typography>
                </Box>
                
               </Box>


               <Box sx={{display:"flex",marginTop:"20px"}}>
                <Box sx={{display:"flex"}}>
                 <FmdGoodIcon/>
                 <Typography sx={{marginLeft:"5px"}}>Address</Typography>
                </Box>
                <Box sx={{marginLeft:"10px",textAlign:"left"}}>
                <Typography>{shopData && shopData.address}</Typography>
                </Box>
                
               </Box>
           </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
           <Box sx={{border:"1px solid #344767",borderRadius:"20px",padding:"20px"}}>
           <div id="map2" style={{width:"100%",height:"400px",borderRadius:"20px"}}></div>
           </Box>
        </Grid>

       

     
      
       
      </Grid>
                </Box>

                <Box sx={{marginTop:"60px"}}>
                <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                <Grid item xs={12} sm={12} md={4}> 
            
                <Button fullWidth onClick={handelChatus} variant='contained' sx={{background:"#344767"}}>Chat with us</Button>

                </Grid>

                <Grid item xs={12} sm={12} md={4}> 
                <Button fullWidth variant='contained' sx={{background:"#344767"}} onClick={handleDirectionClick}>Get Directions</Button>
                </Grid>

                <Grid item xs={12} sm={12} md={4}> 
            <Button fullWidth variant='contained' sx={{background:"#344767"}} onClick={handleOpen2}>Provide Feedback</Button>

                </Grid>
                   </Grid>

                  


                  

                </Box>
              </Box>


              <Box style={{marginTop:"40px",marginBottom:"60px"}}>
                <Box sx={{marginTop:"20px",padding:"10px"}}>

                  {
                    shopFeedbackData && shopFeedbackData.map((el,index)=>{
                      return <Box sx={{marginTop:"20px",border:"1px solid #344767",display:"flex",justifyContent:"left",alignItems:"center",padding:"10px",borderRadius:"10px"}}>
                      <Box>
                      <Avatar sx={{ bgcolor:"#850F8D" }} aria-label="recipe">
           { el.userId.name.charAt(0)}
         </Avatar>
                      </Box>
                      <Box sx={{textAlign:"left",marginLeft:"20px"}}>
                        <Typography sx={{fontWeight:"bold",fontSize:"16px"}}>{el.userId.name}</Typography>
                        <Typography sx={{fontSize:"14px"}}>{el.experience}</Typography>
                        <Typography sx={{fontSize:"12px"}}>{el.feedbackMessage}</Typography>
                      </Box>
                     </Box>
                    })
                  }
                
                </Box>
                   
              </Box>
          
             </Box>
             </Box>
            
              
              
            </CardContent>
          </Card>
                   </Box>
                   <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Box sx={{display:"flex",justifyContent:"right",alignItems:"center",marginTop:"-20px"}}>
          <CloseIcon onClick={handleClose2} sx={{fontSize:"24px"}}/>
          </Box>
          <Box sx={{marginTop:"20px"}}>
<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Your Experience</InputLabel>
        <Select
          fullWidth
          label="From"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        >
         
            <MenuItem  value={"Bad"}>
              Bad 
            </MenuItem>
            <MenuItem  value={"Good"}>
              Good
            </MenuItem>

            <MenuItem  value={"Very Good"}>
              Very Good
            </MenuItem>
          
        </Select>
        </FormControl>
                </Box>

          <Box sx={{marginTop:"20px"}}>
             <TextField fullWidth variant='outlined' label="Feedback ..." name='feedback' value={formData.feedback}  onChange={handleChange} ></TextField>
          </Box>

          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"60px"}}>
            <Button variant='contained' onClick={handelFeedbackSubmit}>Submit</Button>
          </Box>
        
      
        </Box>
      </Modal>

                <Box sx={{marginTop:"30px"}}>
        <Footer/>
        </Box>
     </Box>
  )
}
