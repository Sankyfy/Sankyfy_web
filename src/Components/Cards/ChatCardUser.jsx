import { Box, Typography } from '@mui/material'
import React from 'react'

export const ChatCardUser = ({msg}) => {
  return (
    <Box sx={{padding:"8px",background:"#547af1",borderRadius:"15px",maxWidth:"300px",textAlign:"left",marginTop:"10px",borderBottomRightRadius:"0px",minWidth:"80px",textAlign:"center"}}>
                    <Typography style={{fontSize:"14px",color:"#fff"}}>{msg}</Typography>
                </Box>
  )
}
