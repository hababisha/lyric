import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddMezmur from './pages/Addmezmur';

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/add" element={<AddMezmur />} />

    </Routes>
  </Router>
)
const App = () => {
  return <div>{routes}</div>
  
}

export default App
