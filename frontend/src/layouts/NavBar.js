import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideMenu from './SideMenu';
import PersonIcon from '@mui/icons-material/Person'; // Import the user icon

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the sidebar display
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State to manage user menu

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen); // メニューバーの開閉状態を反転
  };
  const navigate = useNavigate();

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen); // Toggle user menu display
  };

  const checkLoginStatus = () => {
    // ログイン状態を取得するAPIリクエスト
    axios.get(process.env.REACT_APP_API + '/user', {
      withCredentials: true,
      withXSRFToken: true,
      // 他の必要なオプションがあればここに追加
    })
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true); // ログイン済みの場合、isLoggedInをtrueに設定
        }
      })
      .catch((error) => {
        console.error('ログイン状態の取得に失敗しました:', error);
      });
  };

  useEffect(() => {
    checkLoginStatus();
    /*
    // ログイン状態を取得するAPIリクエスト
    axios.get(process.env.REACT_APP_API + '/user',
      {
        withCredentials: true,
        
      }
    )
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true); // ログイン済みの場合、isLoggedInをtrueに設定
        }
      })
      .catch((error) => {
        console.error('ログイン状態の取得に失敗しました:', error);
      });*/
  }, []);


  const handleLogout = () => {
    axios.post(process.env.REACT_APP_API + '/logout',
      {},
      {
        withCredentials: true,
        withXSRFToken: true,
        // 他の必要なオプションがあればここに追加
      }
    ) // ログアウトエンドポイントへのPOSTリクエスト
      .then((response) => {
        // ログアウトが成功した場合の処理
        console.log('ログアウトしました:', response);
        // ログアウト後のフロントエンド側の処理を追加する場合はここに記述
        setIsLoggedIn(false);    // ログアウト処理を行う
        navigate('/login'); // ログアウト後、ログインページにリダイレクト
      })
      .catch((error) => {
        // ログアウトが失敗した場合の処理
        console.error('ログアウトに失敗しました:', error);
      });

    
  };
  return (
    <>
      <style jsx="true">{`
        .navbar-wrapper {
          margin-bottom: 88px;
        }
        /* Add any additional styling for the user menu here */
        .user-menu {
          position: absolute;
          top: 50px; /* Adjust the position as needed */
          right: 20px; /* Adjust the position as needed */
          background-color: white;
          border: 1px solid #ccc;
          padding: 10px;
          display: ${isUserMenuOpen ? 'block' : 'none'}; // Show/hide based on state
        }
      `}</style>
      <Box sx={{ flexGrow: 1 }} className="navbar-wrapper">
        <AppBar position="fixed">
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuClick} // メニューアイコンがクリックされたときのハンドラを設定
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              おせっかいおばちゃん
            </Typography>

            {/* User Icon/Button */}
            <IconButton
              color="inherit"
              aria-label="user-menu"
              onClick={handleUserMenuClick} // Handle click on user icon
            >
              <PersonIcon />
            </IconButton>

            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                ログアウト
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                ログイン
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {/* User Menu */}
      <div className="user-menu">
        <ul>
          <li>
            <a href="/user">ユーザー情報編集</a>
          </li>
          <li>
            <button onClick={handleLogout}>ログアウト</button>
          </li>
        </ul>
      </div>

      <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isLoggedIn={isLoggedIn} />
    </>
  );
}