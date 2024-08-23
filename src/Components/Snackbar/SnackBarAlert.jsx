import { Alert, Snackbar } from '@mui/material';
import React from 'react'

export const SnackBarAlert = ({setOpen,open,msg,vairent}) => {
    
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity={vairent}
      variant="filled"
      sx={{ width: '100%' }}
    >
      
    {msg}
    </Alert>
  </Snackbar>
  )
}
