import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import Top from "./pages/Top";
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <>
      <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Top />} />
          </Routes>
      <Footer />
    </>
  );
}