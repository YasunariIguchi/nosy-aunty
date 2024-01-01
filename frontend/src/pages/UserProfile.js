import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ setUserName }) => {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    const inputValue = e.target.value;

    if (!validateEmail(inputValue)) {
      // 不正な形式の場合、エラーメッセージをセットする
      setError('正しいEメールアドレスを入力してください');
    } else {
      // 正しい形式の場合、エラーメッセージをクリアする
      setError('');
    }

    setEmail(inputValue);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
    try {
      const updatedUserData = { ...userData, name, email };
      const response = await axios.put(`${process.env.REACT_APP_API}/user`, updatedUserData, {
        withCredentials: true,
        withXSRFToken: true,
        // 他の必要なオプションがあればここに追加
      });
      if (response.data.success) {
        // 成功した場合、通知を表示しリダイレクトする
        alert(response.data.message); // 通知を表示するための例（適切なUIライブラリや方法を使用することをお勧めします）
        // リダイレクト処理（例：React Routerの場合）
        setUserName(name)
        navigate('/'); // リダイレクト先のパスを指定
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      if (error.response && error.response.data && !error.response.data.success) {
        alert(error.response.data.message); // エラーメッセージの表示
      } else {
        alert('ユーザー情報の更新に失敗しました。'); // デフォルトのエラーメッセージ
      }
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
            error={Boolean(error)} // エラーがある場合にエラースタイルを適用
            helperText={error} // エラーメッセージを表示
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
