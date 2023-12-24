import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ConversationList = () => {
  const [conversationList, setConversationList] = useState([]);

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


  return (
    <div>
      <TableContainer component={Paper}>
        <Typography variant="h6" gutterBottom>
          おばちゃんとの会話履歴
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>投稿日時</b></TableCell>
              <TableCell><b>投稿内容</b></TableCell>
              <TableCell><b>おばちゃんのアドバイス</b></TableCell>
              <TableCell><b>詳細</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversationList.map((conversation) => (
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
    </div>
  );

};

export default ConversationList;
