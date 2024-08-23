
import { Box, Button, List, ListItem, ListItemText, Modal, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Base_Url } from '../../Configs/BaseUrl';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw', // Use viewport width for responsiveness
  maxWidth: '90vw', // Use viewport width for max width as well for mobile screens
  height: 'auto', // Let height adjust based on content
  maxHeight: '70vh', // Set a maximum height for responsiveness
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2, // Reduced padding for mobile
  overflow: 'auto', // Add overflow for scrollability
  borderRadius: '8px', // Add border-radius for better aesthetics
  '@media (min-width: 600px)': {
    maxWidth: '600px', // Adjust max-width for larger screens
    p: 4, // Increase padding for larger screens
  }
};
export const SelectStateModel = ({open, setOpen,selectedValue,setSelectedValue,setSelectedCity}) => {
    const [data,setData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filteredData = data.filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );

  const getStates = async () => {
    try {
      const response = await axios.get(`${Base_Url}api/unifiedPinCode`);
      const Data =response.data.data
      const uniqueStates = [...new Set(Data.map(item => item.state_name))];
      setData(uniqueStates);
      console.log("State all", uniqueStates)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleSelect = (item) => {
    if(item === ""){
        setSelectedValue("");
        setSelectedCity("")
        handleClose()
        return;
    }
    setSelectedValue(item);
    setSelectedCity("")
    handleClose()
  };

  useEffect(()=>{
    getStates()
  },[])
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
        <Box >
             
        <div style={{position:"absolute",right:10,top:10}}>
 <HighlightOffRoundedIcon onClick={handleClose} />
        </div>
     <div style={{marginTop:"30px"}}>
      <TextField 
        label="Search" 
        variant="outlined" 
        fullWidth 
        value={query} 
        onChange={handleSearch} 
        style={{ marginBottom: '20px' }}
      />
      <List>
      <ListItem 
            
            onClick={() => handleSelect("")}
          >
            <ListItemText primary={"None"} />
          </ListItem>
      {filteredData.map((item, index) => (
          <ListItem 
            key={index}
            onClick={() => handleSelect(item)}
            style={{
              border: item === selectedValue ? '2px solid green' : 'none'
            }}
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </div>

        </Box>
       
    
    {/* <Button sx={{marginLeft:"30px"}} onClick={handleClose} variant="contained">Close</Button> */}
    </Box>
  </Modal>
  )
}
