import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>投稿日時</TableCell>
            <TableCell>投稿内容</TableCell>
            <TableCell>おばちゃんのアドバイス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conversationList.map((conversation) => (
            <TableRow key={conversation.id}>
              <TableCell>{truncateString(conversation.created_at)}</TableCell>
              <TableCell>{truncateString(conversation.line, 20)}</TableCell>
              <TableCell>{truncateString(conversation.advice, 20)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

};

export default ConversationList;
