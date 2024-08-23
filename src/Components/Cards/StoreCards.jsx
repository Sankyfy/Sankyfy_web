import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageIcon from '@mui/icons-material/Message';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Base_Url } from '../../Configs/BaseUrl';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const StoreCards =({data})=> {
  const navigation = useNavigate()
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDirectionClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${data.lat},${data.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handelShopClick = ()=>{
    // navigation(`shop-view/${data._id}`)
    window.location.href = `shop-view/${data._id}`
  }

  const handelChatus = ()=>{
    console.log("Chat us Data ===>",data)
    if(userDetails){
      // window.location.href = `chat/${shopData.shopkeeperId._id}`
      navigation(`chat/${data.shopkeeperId}`)
      return
  }

  alert("Please Login to chat with store owner")
    
  }

  return (
    <Card sx={{ maxWidth: "100%",boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',borderRadius:"20px" }}>
      <Box onClick={handelShopClick}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data && data.shopName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Box sx={{width:"24px"}}>

            </Box>
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={data &&data.shopName}
        subheader={data &&data.city}
      />
      {
        data && data.images[0] ?   <CardMedia
        component="img"
        height="194"
        image={`${Base_Url}api/${data.images[0].path}`}
        alt="Paella dish"
      />
      :
      <CardMedia
        component="img"
        height="194"
        image={`./assets/images/products/product-6-min.jpg`}
        alt="Paella dish"
      />
      }
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
       {data &&data.address}
        </Typography>
      </CardContent>
      </Box>
     
      <CardActions disableSpacing sx={{display:"flex",justifyContent:"right",alignItems:"center"}}>
        <IconButton onClick={handelChatus} aria-label="add to favorites">
          <MessageIcon color='primary'/>
          <span style={{fontSize:"14px",fontWeight:"bold"}}>Chat</span>
        </IconButton>
        <IconButton onClick={handleDirectionClick} aria-label="share">
          
          <DirectionsIcon id='iconB' />
          <span style={{fontSize:"14px",fontWeight:"bold"}}>Direction</span>
        </IconButton>
      
      </CardActions>
  
    </Card>
  );
}