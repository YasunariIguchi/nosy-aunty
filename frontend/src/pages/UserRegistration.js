import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const UserRegistration = ({ isLoggedIn, setIsLoggedIn, setUserName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);

    if (!validateName(inputValue)) {
      setNameError('名前は1〜255文字で入力してください');
    } else {
      setNameError('');
    }
  };


  const validateName = (name) => {
    return name.trim() !== '' && name.length <= 255;
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;

    if (!validateEmail(inputValue)) {
      setEmailError('正しいEメールアドレスを入力してください');
    } else {
      setEmailError('');
    }

    setEmail(inputValue);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError('パスワードは8文字以上で、大文字・小文字・数字をそれぞれ1文字以上含めてください');
    } else {
      setPasswordError('');
    }
    if (confirmPassword) {
      if (e.target.value !== confirmPassword) {
        setConfirmError('パスワードが一致しません');
      } else {
        setConfirmError('');
      }
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);

    if (inputValue !== password) {
      setConfirmError('パスワードが一致しません');
    } else {
      setConfirmError('');
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email) || !validateName(name) || password !== confirmPassword) {
      if (!validateName(name)) {
        setNameError('名前は空白でない255文字以内で入力してください');
      }
      if (!validateEmail(email)) {
        setEmailError('正しいEメールアドレスを入力してください');
      }
      if (password !== confirmPassword) {
        setConfirmError('パスワードが一致しません');
      }
      return;
    }    
    try {
      const userData = {
        "name": name,
        "email": email,
        "password": password,
        "password_confirmation": confirmPassword
      };
      const response = await axios.post(`${process.env.REACT_APP_API}/register`, userData, {
        withCredentials: true,
        withXSRFToken: true,
        // 他の必要なオプションがあればここに追加
      });
      if (response.status === 200) {
        setUserName(response.data.name);
        setIsLoggedIn(true);
        alert('ユーザー登録が完了しました。');
        navigate('/');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      let errorMessage = 'ユーザー登録に失敗しました。\n'; // エラーメッセージの先頭に付ける文字列
      if (error.response && error.response.data && error.response.data.errors) {
        errorMessage += Object.values(error.response.data.errors).join("\n");
      } else {
        errorMessage += 'サーバーエラーが発生しました。'; // エラーメッセージが明確でない場合のデフォルトメッセージ
      }
      alert(errorMessage);
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
            error={Boolean(nameError)}
            helperText={nameError}
          />
          <TextField
            label="Eメールアドレス"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <TextField
            type="password"
            label="パスワード"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
          <TextField
            type="password"
            label="パスワード（確認用）"
            variant="outlined"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={Boolean(confirmError)}
            helperText={confirmError}
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
