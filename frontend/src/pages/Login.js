// 必要なパッケージをインポート
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      // ログイン成功時の処理
      console.log('ログイン成功');
      setIsLoggedIn(true);
      navigate('/'); // ログイン後のリダイレクト先を指定
    } catch (error) {
      if (error.response) {
        // サーバーからのレスポンスがある場合
        setError('ログインに失敗しました。ユーザー名とパスワードを確認してください。');
      } else if (error.request) {
        // リクエストが送信されたがレスポンスがない場合
        setError('ネットワークエラーが発生しました。もう一度お試しください。');
      } else {
        // リクエストすら送信されなかった場合
        setError('予期せぬエラーが発生しました。もう一度お試しください。');
      }
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
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
