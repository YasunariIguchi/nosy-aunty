import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const SideMenu = ({ isMenuOpen, setIsMenuOpen, isLoggedIn }) => {
  // サイドメニューの項目やクリック時の処理をここに追加

  return (
    <Drawer
      open={isMenuOpen}
      onClose={() => setIsMenuOpen(false)} // メニューを閉じる処理
    >
      <List>
        {/* メニュー項目のリスト */}
        <ListItem button component={Link} to="/">
          <ListItemText primary="トップ" />
        </ListItem>
        {isLoggedIn && ( // ログインしている場合のみ会話履歴を表示
          <ListItem button component={Link} to="/conversations">
            <ListItemText primary="会話履歴" />
          </ListItem>
        )}
        {/* 他のメニュー項目を追加 */}
      </List>
    </Drawer>
  );
};

export default SideMenu;