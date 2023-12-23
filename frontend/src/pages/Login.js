// Login.js
const Login = ({ history }) => {
  const handleLogin = () => {
    // ログインが成功したとして、遷移するために history.push() を使用
    // ここではダミーのログイン成功後のパス '/dashboard' に遷移する例を示しています
    history.push('/dashboard');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
