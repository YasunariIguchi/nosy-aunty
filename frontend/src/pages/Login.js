import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Container } from '@mui/material';

function Login({ isLoggedIn, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_API + "/login",
        {
          email: email,
          password: password
        },
        {
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setError('ログインに失敗したわ。ユーザー名とパスワードを確認してみ！');
      } else if (error.request) {
        setError('ネットワークエラーが発生したわ。もういっぺん試してみ！');
      } else {
        setError('予期せんエラーが発生したわ。もういっぺん試してみ！');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          ログインページや！
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="メールアドレス"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="パスワード"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            ログイン
          </Button>
          {error && (
            <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Login;