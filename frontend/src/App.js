import { useState } from 'react';
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import Top from "./pages/Top";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ConversationList from './pages/Conversations';
import ConversationDetail from './pages/ConversationDetail';
import UserProfile from './pages/UserProfile';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/" element={<Top />} />
            <Route path="/conversations" element={<ConversationList />} />
            <Route path="/conversation/:id" element={<ConversationDetail />} />
            <Route path="/user" element={<UserProfile />} />
          </Routes>
      <Footer />
    </>
  );
}