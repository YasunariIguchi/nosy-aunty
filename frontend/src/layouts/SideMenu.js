import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const SideMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  // サイドメニューの項目やクリック時の処理をここに追加

  return (
    <Drawer
      open={isMenuOpen}
      onClose={() => setIsMenuOpen(false)} // メニューを閉じる処理
    >
      <List>
        {/* メニュー項目のリスト */}
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        {/* 他のメニュー項目を追加 */}
      </List>
    </Drawer>
  );
};

export default SideMenu;