import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'datetime', label: '投稿日時', minWidth: 100 },
  { id: 'topic', label: '投稿内容', minWidth: 100 },
  { id: 'reply', label: 'おばちゃんのアドバイス', minWidth: 100 },
  { id: 'detail', label: '詳細', minWidth: 100, align: 'center' },
];

const ConversationList = () => {
  const [conversationList, setConversationList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    // 会話履歴を取得するAPIエンドポイントのURL
    const apiUrl = process.env.REACT_APP_API + "/conversations";

    // APIを叩いて会話履歴を取得する
    axios.get(apiUrl, {
      withCredentials: true,
      withXSRFToken: true,
      // 他の必要なオプションがあればここに追加
    })
      .then((response) => {
        // 時刻をJSTに変換する処理
        const convertedData = response.data.map((conversation) => {
          const date = new Date(conversation.created_at);
          // UTCから日本時間に変換（9時間追加）
          const jstDate = new Date(date.getTime());
          return { ...conversation, created_at: jstDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }) };
        });
        // 投稿日時で降順ソート
        const sortedData = convertedData.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setConversationList(sortedData);
      })
      .catch((error) => {
        console.error('会話履歴の取得に失敗しました:', error);
      });
  }, []); // ページ遷移時に1度だけ実行される

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  const getPaginatedData = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return conversationList.slice(startIndex, endIndex);
  };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h5" gutterBottom>
        おばちゃんとの会話履歴
      </Typography>
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getPaginatedData().map((conversation) => (
              <TableRow key={conversation.id}>
                <TableCell>{truncateString(conversation.created_at)}</TableCell>
                <TableCell>{truncateString(conversation.line, 30)}</TableCell>
                <TableCell>{truncateString(conversation.advice, 30)}</TableCell>
                <TableCell align="center">
                  <Button component={Link} to={`/conversation/${conversation.id}`} variant="contained" color="primary">
                    詳細確認
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={conversationList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

};

export default ConversationList;