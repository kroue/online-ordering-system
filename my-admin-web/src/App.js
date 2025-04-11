import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SidebarLayout from './SidebarLayout';
import Login from './Login';
import Register from './Register';
import MenuManagement from './MenuManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Sidebar layout for authenticated pages */}
        <Route path="/menu" element={<SidebarLayout><MenuManagement /></SidebarLayout>} />
        <Route path="/orders" element={<SidebarLayout><OrderManagement /></SidebarLayout>} />
        <Route path="/users" element={<SidebarLayout><UserManagement /></SidebarLayout>} />
      </Routes>
    </Router>
  );
}

export default App;