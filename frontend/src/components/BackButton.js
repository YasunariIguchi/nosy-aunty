// BackButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const BackButton = ({ page, rowsPerPage }) => {
  return (
    <div>
      <Button component={Link} to={`/conversations?page=${page}&rowsPerPage=${rowsPerPage}`} variant="contained" color="primary" className="back-link">
        戻る
      </Button>
    </div>
  );
};

export default BackButton;