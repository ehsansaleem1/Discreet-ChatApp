import './App.css'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import ChatPage from './pages/chatPage'
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
       <Route path="/" element={<LoginPage />} />
       <Route path="/home" element={<HomePage />} />
       <Route path="/home/:id" element={<ChatPage />} />
    </Routes>
  )
}
