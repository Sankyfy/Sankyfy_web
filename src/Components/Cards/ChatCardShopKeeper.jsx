import { Box, Typography } from '@mui/material'
import React from 'react'

export const ChatCardShopKeeper = ({msg}) => {
  return (
    <Box sx={{padding:"10px",background:"#d8dcee",borderRadius:"15px",maxWidth:"300px",textAlign:"left",marginTop:"10px",borderTopRightRadius:"0px",textAlign:"center"}}>
    <Typography style={{fontSize:"14px"}}>{msg}</Typography>
</Box>
  )
}
