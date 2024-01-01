import { useEffect, useState, useRef} from 'react';
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
import { Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Import the user icon

export default function NavBar({ isLoggedIn, setIsLoggedIn, userName, setUserName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const userIconRef = useRef(null);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleClickInsideMenu = (e) => {
    if (userMenuRef.current && userMenuRef.current.contains(e.target) || (userIconRef.current && userIconRef.current.contains(e.target))) {
      return;
    }
    setIsUserMenuOpen(false);
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
          setUserName(response.data.name)
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
    document.addEventListener('mousedown', handleClickInsideMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickInsideMenu);
    };
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
        setIsUserMenuOpen(false);
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
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              おせっかいおばちゃん
            </Typography>

            {/* User Info */}
            {isLoggedIn && (
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                {userName}
              </Typography>
            )}

            {/* User Icon/Button */}
            <div ref={userIconRef} style={{ position: 'relative', display: 'inline-block' }}>
              <IconButton
                color="inherit"
                aria-label="user-menu"
                onClick={handleUserMenuClick}
                style={{ display: isLoggedIn ? 'inline-block' : 'none' }}
              >
                <PersonIcon />
              </IconButton>

              {/* Menu directly below the user icon */}
              <Menu
                anchorEl={userIconRef.current}
                open={isUserMenuOpen}
                onClose={() => setIsUserMenuOpen(false)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                style={{ marginTop: '35px' }} // Adjust the top margin as needed
              >
                <MenuItem component={Link} to="/user">ユーザー情報編集</MenuItem>
                <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
              </Menu>
            </div>

            {/* Login Button */}
            <Button color="inherit" component={Link} to="/login" style={{ display: !isLoggedIn ? 'inline-block' : 'none' }}>
              ログイン
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Side Menu */}
      <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isLoggedIn={isLoggedIn} />
    </>
  );
}