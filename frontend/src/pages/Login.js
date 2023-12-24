// 必要なパッケージをインポート
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // フォームのデフォルトの動作を無効化する

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
          // 他の必要なオプションがあればここに追加
        }
      );
      console.log(response.status)

      if (response.status === 204) {
        // ログイン成功時の処理
        console.log('ログイン成功');
        setIsLoggedIn(true);
        navigate('/'); // ログイン後のリダイレクト先を指定
      } else {
        console.error('ログインが失敗しました');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
