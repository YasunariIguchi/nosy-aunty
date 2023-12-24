import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';
import './ConversationDetail.css';
import { useTheme } from '@mui/material/styles';

const ConversationDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const convertToJST = (utcDate) => {
    const convertedDate = new Date(utcDate);
    return convertedDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  };

  useEffect(() => {
    const fetchConversationDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/conversation/${id}`, {
          withCredentials: true,
          withXSRFToken: true,
        });
        const updatedConversation = {
          ...response.data,
          created_at: convertToJST(response.data.created_at),
        };
        setConversation(updatedConversation);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversation detail:', error);
        setError('会話履歴を取得できませんでした。');
        setLoading(false);
      }
    };

    fetchConversationDetail();
  }, [id]);

  return (
    <div className="conversation-detail-container">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : conversation ? (
        <div className="conversation-detail-content">
          <Typography variant="h4" gutterBottom style={{ alignSelf: 'flex-start' }}>
            会話履歴詳細
          </Typography>
          <Typography style={{ alignSelf: 'flex-start' }}>
            投稿日時: {conversation.created_at}
          </Typography>
          <div className="split-panel">
            <div className="scrollable-panel" style={{ backgroundColor: theme.palette.primary.main }}>
              <div className="centered-content">
                <Typography variant="h6" style={{ color: theme.palette.common.white }}><b>投稿内容</b></Typography>
              </div>
            </div>
            <div className="scrollable-panel" style={{ backgroundColor: theme.palette.primary.main }}>
              <div className="centered-content">
                <Typography variant="h6" style={{ color: theme.palette.common.white }}><b>おばちゃんからのアドバイス</b></Typography>
              </div>
            </div>
          </div>
          <div className="split-panel">
            <div className="scrollable-panel">
              <Typography style={{ whiteSpace: 'pre-line' }}>{conversation.line}</Typography>
            </div>
            <div className="scrollable-panel">
              <Typography style={{ whiteSpace: 'pre-line' }}>{conversation.advice}</Typography>
            </div>
          </div>
        </div>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default ConversationDetail;
