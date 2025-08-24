import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Settings from './pages/Settings';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignUpPage';
import { useChatStore } from "./hooks/useChat";
import FirstPageLoad from './components/Loaders/FirstPageLoad';
// import { Navigate, Route, Routes } from 'react-router';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuth();

  useEffect(() => {
    checkAuth();
    useChatStore.getState().subsToMessages();
  }, [checkAuth])

  // console.log( authUser );

  if (isCheckingAuth && !authUser) return <FirstPageLoad />

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser !== null ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={authUser === null ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/login' element={authUser === null ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={authUser !== null ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;