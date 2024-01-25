import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCard from './components/UserCard';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserCard />} />
      <Route path="/users/:userId" element={<UserProfile />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
