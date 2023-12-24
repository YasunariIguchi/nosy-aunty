import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        setConversationList(response.data); // レスポンスから会話履歴のデータをセットする
      })
      .catch((error) => {
        console.error('会話履歴の取得に失敗しました:', error);
      });
  }, []); // ページ遷移時に1度だけ実行される

  return (
    <div>
      <h2>会話履歴一覧</h2>
      <ul>
        {conversationList.map((conversation) => (
          <li key={conversation.id}>
            <p>投稿日時: {conversation.created_at}</p>
            <p>投稿内容: {conversation.line}</p>
            <p>おばちゃんのアドバイス: {conversation.advice}</p>
            {/* 他の表示したい情報があればここに追加 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
