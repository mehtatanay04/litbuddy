import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { ProfileProvider } from './hooks/useProfile.jsx';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Learning from './pages/Learning';
import Games from './pages/Games';
import Stories from './pages/Stories';
import Rewards from './pages/Rewards';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <div className="text-2xl font-bold text-gray-700">Loading LitBuddy...</div>
        </div>
      </div>
    );
  }

  return (
    <ProfileProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            
            {/* Protected routes */}
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/learn" element={user ? <Learning /> : <Navigate to="/login" />} />
            <Route path="/games" element={user ? <Games /> : <Navigate to="/login" />} />
            <Route path="/stories" element={user ? <Stories /> : <Navigate to="/login" />} />
            <Route path="/rewards" element={user ? <Rewards /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;