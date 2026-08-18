import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from './store/authStore';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Progress from './pages/Progress';
import Community from './pages/Community';
import Achievements from './pages/Achievements';
import Vocabulary from './pages/learn/Vocabulary';
import Grammar from './pages/learn/Grammar';
import Speaking from './pages/learn/Speaking';
import Listening from './pages/learn/Listening';

function RequireAuth({ children }: { children: ReactNode }) {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AutoRedirect() {
  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  return <Navigate to={isLoggedIn ? '/dashboard' : '/home'} replace />;
}

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AutoRedirect />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<RequireAuth><Dashboard /></RequireAuth>} />

      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/courses" element={<RequireAuth><Courses /></RequireAuth>} />
      <Route path="/progress" element={<RequireAuth><Progress /></RequireAuth>} />
      <Route path="/community" element={<RequireAuth><Community /></RequireAuth>} />
      <Route path="/achievements" element={<RequireAuth><Achievements /></RequireAuth>} />

      <Route path="/learn/vocabulary" element={<RequireAuth><Vocabulary /></RequireAuth>} />
      <Route path="/learn/grammar" element={<RequireAuth><Grammar /></RequireAuth>} />
      <Route path="/learn/speaking" element={<RequireAuth><Speaking /></RequireAuth>} />
      <Route path="/learn/listening" element={<RequireAuth><Listening /></RequireAuth>} />

      <Route path="*" element={<AutoRedirect />} />
    </Routes>
  );
}
