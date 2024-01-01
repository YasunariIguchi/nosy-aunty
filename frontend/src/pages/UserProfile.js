import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/user`, {
          withCredentials: true,
          withXSRFToken: true,
          // 他の必要なオプションがあればここに追加
        });
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = { ...userData, name, email };
      const response = await axios.put(`${process.env.REACT_APP_API}/user`, updatedUserData);
      console.log('User data updated:', response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <h2>プロフィール編集</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
          <TextField
            label="名前"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            label="Eメールアドレス"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          <Button variant="contained" type="submit">
            変更を保存
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserProfile;
