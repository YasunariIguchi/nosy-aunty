import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  return (
    <>
      <style jsx="true">{`
        .navbar-wrapper {
          margin-bottom: 88px;
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
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              おせっかいおばさん
            </Typography>

            <Button color="inherit">Login</Button>

          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}