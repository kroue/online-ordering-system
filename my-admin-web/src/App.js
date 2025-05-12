import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SidebarLayout from './SidebarLayout';
import Login from './Login';
import Register from './Register';
import MenuManagement from './MenuManagement';
import OrderManagement from './OrderManagement';
import UserManagement from './UserManagement';
import CreatePizza from './CreatePizza';
import CreateSize from './CreateSize';
import CreateTopping from './CreateTopping';
import VerifyEmail from './VerifyEmail';
import CreateCrustType from './CreateCrustType';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(JSON.parse(user).email);
      }
    };

    checkLoginStatus();

    // Listen for changes in localStorage (logout from other tabs)
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail('');
    window.localStorage.setItem('logout', Date.now()); // To trigger logout across other tabs
  };

  return (
    <Router>
      <Routes>
        {/* Default route redirects to Menu if logged in, otherwise to Login */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/menu" /> : <Navigate to="/login" />} />

        {/* Login and Register Routes */}
        <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
        <Route path="/register" element={<Register onLogin={setIsLoggedIn} />} />
        <Route path="/verify-email" element={<VerifyEmail />} /> {/* Verification route */}

        {/* Sidebar layout for authenticated pages */}
        <Route path="/menu" element={isLoggedIn ? (
          <SidebarLayout onLogout={handleLogout} userEmail={userEmail}>
            <MenuManagement />
          </SidebarLayout>
        ) : <Navigate to="/login" />} />
        <Route path="/create-pizza" element={isLoggedIn ? (
          <SidebarLayout onLogout={handleLogout} userEmail={userEmail}>
            <CreatePizza />
          </SidebarLayout>
        ) : <Navigate to="/login" />} />
        <Route path="/create-size" element={isLoggedIn ? (
          <SidebarLayout onLogout={handleLogout} userEmail={userEmail}>
            <CreateSize />
          </SidebarLayout>
        ) : <Navigate to="/login" />} />
        <Route path="/orders" element={isLoggedIn ? (
          <SidebarLayout onLogout={handleLogout} userEmail={userEmail}>
            <OrderManagement />
          </SidebarLayout>
        ) : <Navigate to="/login" />} />
        <Route path="/create-topping" element={isLoggedIn ? (
          <SidebarLayout onLogout={handleLogout} userEmail={userEmail}>
            <CreateTopping />
          </SidebarLayout>
        ) : <Navigate to="/login" />} />
        <Route path="/users" element={isLoggedIn ? (
          <SidebarLayout onLogout={handleLogout} userEmail={userEmail}>
            <UserManagement />
          </SidebarLayout>
        ) : <Navigate to="/login" />} />
        <Route path="/create-crust-type" element={isLoggedIn ? (
          <SidebarLayout onLogout={handleLogout} userEmail={userEmail}>
            <CreateCrustType />
          </SidebarLayout>
        ) : <Navigate to="/login" />} />

        {/* Redirect any other routes to Login */}
      </Routes>
    </Router>
  );
}

export default App;
