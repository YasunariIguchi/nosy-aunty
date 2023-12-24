// ConversationDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConversationDetail = () => {
  const { id } = useParams(); // URLパラメータからIDを取得
  const [conversation, setConversation] = useState(null);
  const [error, setError] = useState(null); // エラー状態を管理

  useEffect(() => {
    // APIから会話履歴の詳細を取得する関数
    const fetchConversationDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/conversation/${id}`, {
          withCredentials: true,
          withXSRFToken: true,
          // 他の必要なオプションがあればここに追加
        });
        setConversation(response.data);
      } catch (error) {
        console.error('Error fetching conversation detail:', error);
        setError('会話履歴を取得できませんでした。'); // エラーが起きた場合のメッセージ
      }
    };

    fetchConversationDetail(); // 関数を実行
  }, [id]); // idが変更された時のみ再実行

  return (
    <div>
      <h2>会話履歴詳細</h2>
      {error ? (
        <p>{error}</p> // エラーメッセージの表示
      ) : conversation ? (
        <div>
          <p>作成日時: {conversation.created_at}</p>
          <p>ライン: {conversation.line}</p>
          <p>アドバイス: {conversation.advice}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ConversationDetail;
