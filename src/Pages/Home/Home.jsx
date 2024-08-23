import React, { useEffect, useState } from 'react'
import {Button,Box, Typography, CardContent, Card, Grid, Paper,Pagination} from '@mui/material';
import { NavBar } from '../../Components/NavBar/NavBar';
import { Footer } from '../../Components/Footer/Footer';
import "./Home.css"
import { StoreCards } from '../../Components/Cards/StoreCards';
import { OurServicesCard } from '../../Components/Cards/OurServicesCard';
import { useNavigate, useParams } from 'react-router-dom';
import { Base_Url } from '../../Configs/BaseUrl';
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { SelectCategoryModel } from '../../Components/Models/SelectCategoryModel';
import { SelectCityModel } from '../../Components/Models/SelectCityModel';
import { SelectStateModel } from '../../Components/Models/SelectStateModel';
import { isMobile } from '../../IsMobile/IsMobile';
import OurS1 from "./ourSU.jpg"
import OurS2 from "./shopvector.jpg"
const Item = styled(Paper)(({ theme }) => ({


}));

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

export const Home = () => {
  const navigation = useNavigate()
  const [shopData,setShopData] = useState([]);
  const [NearbyshopsData,setNearbyshopsData] = useState([]);
  const [randomShopData, setRandomShopData] = useState([]);
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);
  const [categoryOpen,setCategoryOpen] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState("");

  const [cityOpen,setCityOpen] = useState(false);
  const [selectedCity,setSelectedCity] = useState("");

  const [stateOpen,setStateOpen] = useState(false);
  const [selectedState,setSelectedState] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [shopFeedbackData,setShopFeedbackData] = useState(null);
  const [friooAd, setFriooAd] = useState(null);
  const itemsPerPage = 3;
  const count = Math.ceil(NearbyshopsData.length / itemsPerPage);
  const count2 = Math.ceil(filteredData.length / itemsPerPage);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChange2 = (event, value) => {
    setPage2(value);
  };
  
  const paginatedData = NearbyshopsData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const paginatedData2 = filteredData.slice((page2 - 1) * itemsPerPage, page2 * itemsPerPage);

  useEffect(() => {
    if (NearbyshopsData && NearbyshopsData.length > 0) {
      const randomShops = getRandomShopsByCity(NearbyshopsData,shopFeedbackData,'Good');
      console.log("Random shops data=====>",randomShops)
      setRandomShopData(randomShops);
    }
  }, [NearbyshopsData]);

  const OurServicesData = [
    {title:"Users",text:"At our platform, we provide an exceptional service that allows you to seamlessly discover and interact with shops in your vicinity.",path:"/login",img:OurS1},
    {title:"Shopkeepers",text:"We also provide a robust suite of tools for shopkeepers to manage and promote their businesses effectively. By registering and completing the KYC process",path:"signup-shopkeeper",img:OurS2}
  
  ]

  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
  const lat = localStorage.getItem("lat")
  const lng = localStorage.getItem("lng")
  const handelViewShopClick = ()=>{
    navigation("shops")
  }

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

  const fetchNearByShops = async () => {
    try {
      const data = {
        lat:lat,
        lng:lng,
        maxDistance:100
      }
      const response = await axios.post(`${Base_Url}api/shop/nearby`,data);
  
      if (response.status === 200) {
        const fetchedCategories = response.data;
        console.log(" Nearby shops Data ==>",fetchedCategories)
        setNearbyshopsData(fetchedCategories);
       
      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // const getRandomElements = (array, num) => {
  //   const shuffled = array.sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, num);
  // };

  const fetchShopsFeedback = async () => {
    try {
      const response = await axios.get(`${Base_Url}api/feedback`);
  
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

  
  const getRandomShopsByCity = (shops, feedbacks, selectedExperience) => {
    console.log("Random Shop Data Randow shop nearby ===========================>", shops, feedbacks);
    
    // Group shops by city
    const shopsByCity = shops && shops.length > 0 ? shops.reduce((acc, shop) => {
      if (!acc[shop.city]) {
        acc[shop.city] = [];
      }
      acc[shop.city].push(shop);
      return acc;
    }, {}) : {};
  
    // Function to get feedbacks by experience
    const getShopsByExperience = (experience) => {
      const filteredFeedbacks = feedbacks && feedbacks.filter(feedback => feedback.experience === experience);
      const shopIds = filteredFeedbacks &&  filteredFeedbacks.map(feedback => feedback.shopId ? feedback.shopId._id : '123');
      return shopIds && shops.filter(shop => shopIds.includes(shop._id));
    };
  
    // Get shops based on experience
    let filteredShops = getShopsByExperience("Very Good");
    console.log("Shop for Very Good ==========>",filteredShops)

    if (filteredShops && filteredShops.length === 0) {
      filteredShops = getShopsByExperience("Good");
      console.log("Shop for Good ==========>",filteredShops)
    }
    // if (filteredShops.length === 0) {
    //   filteredShops = getShopsByExperience("Bad");
    //   console.log("Shop for Bad ==========>",filteredShops)
    // }
    if (filteredShops && filteredShops.length === 0) {
      // If no shops match any feedback criteria, fallback to random selection
      console.log("Data No Status Found as shops ===>")
      const cities = Object.keys(shopsByCity);
      const randomCities = getRandomElements(cities, 3);
      const randomShopsByCity = randomCities.map((city) => {
        const cityShops = shopsByCity[city];
        const randomCityShops = getRandomElements(cityShops, 3);
        return { city, shops: randomCityShops };
      });
      return randomShopsByCity;
    }
  
    // Group the filtered shops by city and select 3 random cities and 3 random shops within each
    const filteredShopsByCity = filteredShops && filteredShops.length > 0 ? filteredShops.reduce((acc, shop) => {
      if (!acc[shop.city]) {
        acc[shop.city] = [];
      }
      acc[shop.city].push(shop);
      return acc;
    }, {}) : {};
  
    const cities = Object.keys(filteredShopsByCity);
    const randomCities = getRandomElements(cities, 3);
    const randomShopsByCity = randomCities.map((city) => {
      const cityShops = filteredShopsByCity[city];
      const randomCityShops = getRandomElements(cityShops, 3);
      return { city, shops: randomCityShops };
    });
  
    return randomShopsByCity;
  };
  
  // Utility function to get random elements from an array
  const getRandomElements = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };


  const handelCategoryopen = ()=>{
    setCategoryOpen(true);
  }

  const handelCityopen = ()=>{
    setCityOpen(true);
  }

  const handelStateopen = ()=>{
    setStateOpen(true);
  }

  const applyFilter = () => {
    let filtered = shopData;
   console.log("Aplly filter ==>",selectedState,selectedCity,selectedCategory)
    if (selectedState) {
      filtered = filtered.filter(shop => shop.state.toLowerCase() === selectedState.toLowerCase());
    }

    if (selectedCity) {
      filtered = filtered.filter(shop => shop.city.toLowerCase() === selectedCity.toLowerCase());
    }

    if (selectedCategory) {
      filtered = filtered.filter(shop => shop.shopCategory.toLowerCase() === selectedCategory.toLowerCase());
    }

    setFilteredData(filtered);
  };


  const resetFilter = ()=>{
    setSelectedCategory("");
    setSelectedCity("");
    setSelectedState("");
    setFilteredData([])
  }
 
  const handelLogin =(path)=>{
    navigation(path)
  }

  const fetchAdsData = async () => {
    try {
      const response = await axios.get(`${Base_Url}api/ads/66be3286eced785a43d63cd6`);
      setFriooAd(response.data);
      console.log("DAta of ads ==>",response.data)
    } catch (error) {
      console.log(error.message);
    }
  };




  useEffect(()=>{
    fetchShops();
    fetchNearByShops();
    fetchShopsFeedback();
    fetchAdsData();

  },[])
  return (
    <Box>
       <NavBar />
        <Box  sx={{
        // backgroundImage: 'url(./assets/images/bg-presentation.jpg)',
        // backgroundImage: 'url(./assets/images/products/product-6-min.jpg)',
        // backgroundSize: 'cover',
        // backgroundPosition: 'top', 
        background:"#0a253b",
        width: '100%', // Adjust as needed
        height: '75vh', // Adjust as needed
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        flexDirection:"column"
      }}>
           <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",marginTop:"20px",width:`${isMobile ? '80%' : "60%"}`}}>
            {
              !isMobile && <Box>
              <Typography sx={{fontSize:"38px",color:"#fff"}}>Welcome to Sankyfy, We have everything for Shopkeepers & consumer.</Typography>
              </Box>
              
            }
           <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center",marginTop:"20px" }}>
           

             <Grid item xs={12} sm={6} md={3}  >
             <Button fullWidth onClick={handelCategoryopen} variant='contained' sx={{color:"black",background:"#fff",  '&:hover': {
          color: "#fff",
        }}}>
          {
            selectedCategory == ""  ? "Select Category" : selectedCategory
          }
          
          </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={3} >
            <Button fullWidth onClick={handelStateopen} variant='contained' sx={{color:"black",background:"#fff",  '&:hover': {
          color: "#fff",
        }}}>
          
          {
            selectedState == ""  ? "Select State" : selectedState
          }
        </Button>
            </Grid>
        

            {
          selectedState !== "" &&    <Grid item xs={12} sm={6} md={3}  >
          <Button fullWidth onClick={handelCityopen} variant='contained' sx={{color:"black",background:"#fff",  '&:hover': {
          color: "#fff",
        }}}>
          
          {
            selectedCity == ""  ? "Select City" : selectedCity
          }
          </Button>
          </Grid>
        }
           


           {
    (selectedState !== "" ||  selectedCategory !== "") && 
     <Grid item xs={12} sm={6} md={2} >
    <Button fullWidth onClick={applyFilter}  variant='contained' >
Apply
</Button>
     </Grid>
   }

{
    (selectedState !== "" ||  selectedCategory !== "") &&  
    <Grid item xs={12} sm={6} md={1} >
    <Button fullWidth onClick={resetFilter}  variant='contained' sx={{background:"crimson"}}>
        Reset
      </Button>
                </Grid>
   }





            </Grid>

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

             
              
            <Box className={isMobile ? "" : 'sw'}>

           {
            filteredData && filteredData.length > 0 &&   <Box sx={{ marginTop: "60px" }}>
            <Box sx={{ marginTop: "30px" }}>
              <Typography sx={{ fontSize: "2.25rem", fontWeight: "bold" }}>Searched Shops</Typography>
              <Typography sx={{ color: "#7b809a", fontSize: "1.25rem", marginTop: "10px" }}>
                Each of these shops has been selected for their quality, uniqueness, and dedication to providing an exceptional shopping experience. Dive in and discover your next favorite store
              </Typography>
            </Box>
      
            <Box sx={{ marginTop: "60px" }}>
              <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                {
                  paginatedData2.map((el, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <StoreCards data={el} />
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
      
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
              <Pagination count={count2} page={page2} onChange={handleChange2} color="primary" />
            </Box>
          </Box>
           }
          


    <Box sx={{ marginTop: "60px" }}>
      <Box sx={{ marginTop: "30px" }}>
        <Typography sx={{ fontSize: "2.25rem", fontWeight: "bold" }}>Shops</Typography>
        <Typography sx={{ color: "#7b809a", fontSize: "1.25rem", marginTop: "10px" }}>
          Each of these shops has been selected for their quality, uniqueness, and dedication to providing an exceptional shopping experience. Dive in and discover your next favorite store
        </Typography>
      </Box>

      <Box sx={{ marginTop: "60px" }}>
        <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
          {
            paginatedData.map((el, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StoreCards data={el} />
              </Grid>
            ))
          }
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Pagination count={count} page={page} onChange={handleChange} color="primary" />
      </Box>
    </Box>
  </Box>
            
            

              <Box sx={{marginTop:"60px"}}>
             <Box sx={{width:`${isMobile ? "100%" : "60%"}`,margin:"auto"}}>
              <Box>
              <Box id="cardOurService" sx={{marginTop:"30px"}}>
                  <Typography sx={{fontSize:"3.25rem",fontWeight:"bold",color:"#fff"}}>Our Services</Typography>
                 
                </Box>
                <Box sx={{marginTop:"30px"}}>
                <Typography sx={{color:"#7b809a",fontSize:"1.25rem",marginTop:"10px"}}>Explore our comprehensive platform designed to connect you with local shops effortlessly <br/> and empower shopkeepers with tools to showcase their businesses. </Typography>
                </Box>
              </Box>
             <Box sx={{marginTop:"30px"}}>
                <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                  {
                    OurServicesData.map((el,index)=>{
                      return   <Grid onClick={()=>handelLogin(el.path)} item xs={12} sm={6} md={6} key={index}>
                      <OurServicesCard data={el}/>
                    </Grid>
                    })
                  }
      

     
        </Grid>
        </Box>
             </Box>
             </Box>

            
               <Box sx={{marginTop:"60px"}}>

               <Box sx={{
            background: "linear-gradient(195deg, #42424a, #191919)",
            height: "300px",
            position: 'relative',
            borderRadius:"20px" ,
            display:"flex",
            justifyContent:"center",
            alignItems:"center" // Ensure positioning is relative
        }}>
            <Box sx={{
                backgroundImage: 'url(./assets/images/shapes/waves-white.svg)',
                backgroundSize: 'cover',     // Adjust the size as needed
                backgroundRepeat: 'no-repeat',
                height: '100%',              // Ensure it takes the full height of the parent Box
                width: '100%',               // Ensure it takes the full width of the parent Box
                position: 'absolute',        // Absolute positioning to place it within the parent
                top: 0,
                left: 0,
                opacity:0.1
            }}>

              
            </Box>
            <Box>
            <Typography sx={{color:"#fff",fontSize:"1.875rem",fontWeight:"bold"}}>Discover Shops and Stores Near You  <br/>with Ease</Typography>
            
            {/* <Button variant='outlined' onClick={handelViewShopClick} style={{color:"#fff",marginTop:"20px",borderColor:"#fff"}}>View</Button> */}
            </Box>
        </Box>
               </Box>

{
  friooAd && friooAd.status &&  <Box sx={{marginTop:"30px"}}>

  <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
  <Grid  item xs={12} sm={6} md={4}> 
  <Box >
    {
      friooAd.videolink !== "" ?
      <iframe width="100%" height="315" src={friooAd.videolink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      :
     
      <img src={friooAd.imagelink} style={{width:"100%",height:"315"}} />
    }
        
        </Box>

  </Grid>

  <Grid  item xs={12} sm={6} md={4}> 
  <Box>
         <p style={{fontSize:"18px",color:"black",textAlign:"left"}}>
          {friooAd.description}
         </p>
        </Box>

  </Grid>

  </Grid>
    

       
  </Box>
}
               

              <Box className={isMobile ? "" : 'sw'}>
               
               {
                randomShopData[0] &&   <Box sx={{marginTop:"60px"}}>
                <Box sx={{marginTop:"30px"}}>
                  <Typography sx={{fontSize:"2.25rem",fontWeight:"bold"}}>{randomShopData[0].city}</Typography>
                  <Typography sx={{color:"#7b809a",fontSize:"1.25rem",marginTop:"10px"}}>Each of these shops has been selected for their quality, uniqueness, and dedication to providing an <br/> exceptional shopping experience. Dive in and discover your next favorite store</Typography>
                </Box>

                <Box sx={{marginTop:"30px"}}>
              
                <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                {
                  randomShopData[0].shops.map((el,index)=>{
                    return <Grid key={index} item xs={12} sm={6} md={4}>
                            <StoreCards data={el}/>
                    </Grid> 
                  })
                }
       
               </Grid>
   
                </Box>
           
               </Box>
               }
            
            {
                randomShopData[1] &&   <Box sx={{marginTop:"60px"}}>
                <Box sx={{marginTop:"30px"}}>
                  <Typography sx={{fontSize:"2.25rem",fontWeight:"bold"}}>{randomShopData[1].city}</Typography>
                  <Typography sx={{color:"#7b809a",fontSize:"1.25rem",marginTop:"10px"}}>Each of these shops has been selected for their quality, uniqueness, and dedication to providing an <br/> exceptional shopping experience. Dive in and discover your next favorite store</Typography>
                </Box>

                <Box sx={{marginTop:"30px"}}>
                <Grid container spacing={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
                {
                  randomShopData[1].shops.map((el,index)=>{
                    return <Grid key={index} item xs={12} sm={6} md={4}>
                            <StoreCards data={el}/>
                    </Grid> 
                  })
                }
       
               </Grid>
                </Box>
           
               </Box>
               }

{
                randomShopData[2] &&   <Box sx={{marginTop:"60px"}}>
                <Box sx={{marginTop:"30px"}}>
                  <Typography sx={{fontSize:"2.25rem",fontWeight:"bold"}}>{randomShopData[2].city}</Typography>
                  <Typography sx={{color:"#7b809a",fontSize:"1.25rem",marginTop:"10px"}}>Each of these shops has been selected for their quality, uniqueness, and dedication to providing an <br/> exceptional shopping experience. Dive in and discover your next favorite store</Typography>
                </Box>

                <Box sx={{marginTop:"30px"}}>
               
                <Grid container spacing={2}>
                {
                  randomShopData[2].shops.map((el,index)=>{
                    return <Grid key={index} item xs={12} sm={6} md={4}>
                            <StoreCards data={el}/>
                    </Grid> 
                  })
                }
       
             
      
       
      </Grid>
                </Box>
           
               </Box>
               }

             


             

              </Box>
              
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{marginTop:"30px"}}>
        <Footer/>
        </Box>
  
         



         <Box>
         <SelectCategoryModel open={categoryOpen} setOpen={setCategoryOpen} selectedValue={selectedCategory} setSelectedValue={setSelectedCategory}/>
         
         <SelectCityModel open={cityOpen} setOpen={setCityOpen} selectedState={selectedState} selectedValue={selectedCity} setSelectedValue={setSelectedCity}/>

         <SelectStateModel open={stateOpen} setOpen={setStateOpen} setSelectedCity={setSelectedCity}   selectedValue={selectedState} setSelectedValue={setSelectedState}/>
         </Box>
       
    </Box>
  )
}
