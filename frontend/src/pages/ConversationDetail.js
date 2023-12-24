import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import './ConversationDetail.css';

const ConversationDetail = () => {
const { id } = useParams(); // URLパラメータからIDを取得
const [conversation, setConversation] = useState(null);
const [error, setError] = useState(null); // エラー状態を管理
const [loading, setLoading] = useState(true); // データ読み込み中を管理

const convertToJST = (utcDate) => {
  const convertedDate = new Date(utcDate);
  return convertedDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
};

  useEffect(() => {
    // APIから会話履歴の詳細を取得する関数
    const fetchConversationDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/conversation/${id}`, {
          withCredentials: true,
          withXSRFToken: true,
          // 他の必要なオプションがあればここに追加
        });
        const updatedConversation = {
          ...response.data,
          created_at: convertToJST(response.data.created_at),
          // 他の日付も必要に応じて変換できます
        };
        setConversation(updatedConversation);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversation detail:', error);
        setError('会話履歴を取得できませんでした。'); // エラーが起きた場合のメッセージ
        setLoading(false);
      }
    };

    fetchConversationDetail(); // 関数を実行
  }, [id]); // idが変更された時のみ再実行

  return (
    <div className="conversation-detail-container">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : conversation ? (
        <div className="conversation-detail-content">
          <Typography variant="h4" gutterBottom>
            会話履歴詳細
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`作成日時: ${conversation.created_at}`} />
            </ListItem>
            <ListItem>
                  <ListItemText primary={`ライン:\n ${conversation.line}`} style={{ whiteSpace: 'pre-line' }} />
            </ListItem>
            <ListItem>
                  <ListItemText primary={`アドバイス:\n ${conversation.advice}`} style={{ whiteSpace: 'pre-line' }} />
            </ListItem>
          </List>
        </div>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default ConversationDetail;