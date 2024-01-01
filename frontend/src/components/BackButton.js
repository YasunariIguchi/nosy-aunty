// BackButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const BackButton = () => {
  return (
    <div>
      <Button component={Link} to={`/conversations`} variant="contained" color="primary">
        戻る
      </Button>
    </div>
  );
};

export default BackButton;