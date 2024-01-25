import React from 'react';
import Button from '@mui/material/Button'; // Import Material UI button

const CustomButton = ({ label, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomButton;