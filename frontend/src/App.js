import { useState } from 'react';
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import Top from "./pages/Top";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ConversationList from './pages/Conversations';
import ConversationDetail from './pages/ConversationDetail';
import UserProfile from './pages/UserProfile';
import UserRegistration from './pages/UserRegistration';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userName={userName} setUserName={setUserName} />
      <Routes>
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
        <Route path="/" element={<Top />} />
        <Route path="/conversations" element={<ConversationList />} />
        <Route path="/conversation/:id" element={<ConversationDetail />} />
        <Route path="/user" element={<UserProfile setUserName={setUserName} />} />
        <Route path="/register" element={<UserRegistration isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
      </Routes>
      <Footer />
    </>
  );
}