import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const UserRegistration = ({ isLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;

    if (!validateEmail(inputValue)) {
      setError('正しいEメールアドレスを入力してください');
    } else {
      setError('');
    }

    setEmail(inputValue);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error || !name || !email || !password) {
      setError('全ての項目を正しく入力してください');
      return;
    }
    try {
      const userData = { name, email, password };
      const response = await axios.post(`${process.env.REACT_APP_API}/register`, userData, {
        withCredentials: true,
        // 他の必要なオプションがあればここに追加
      });
      if (response.data.success) {
        alert(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response && error.response.data && !error.response.data.success) {
        alert(error.response.data.message);
      } else {
        alert('ユーザー登録に失敗しました。');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <h2>ユーザー登録</h2>
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
            error={Boolean(error)}
            helperText={error}
          />
          <TextField
            type="password"
            label="パスワード"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" type="submit">
            登録する
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserRegistration;
