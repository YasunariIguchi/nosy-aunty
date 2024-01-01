import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';
import './ConversationDetail.css';
import { useTheme } from '@mui/material/styles';
import BackButton from '../components/BackButton';

const ConversationDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const location = useLocation();
  const [conversation, setConversation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const convertToJST = (utcDate) => {
    const convertedDate = new Date(utcDate);
    return convertedDate.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const rowsPerPageParam = searchParams.get('rowsPerPage');
    if (pageParam && rowsPerPageParam) {
      setPage(parseInt(pageParam) - 1);
      setRowsPerPage(parseInt(rowsPerPageParam));
    }

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
  }, [id, location.search, page, rowsPerPage]);

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
      <div style={{ marginTop: '20px' }}>
        <BackButton page={page + 1} rowsPerPage={rowsPerPage} />
      </div>
    </div>
  );
};

export default ConversationDetail;
