import { useState } from 'react';
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import Top from "./pages/Top";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/" element={<Top />} />
          </Routes>
      <Footer />
    </>
  );
}