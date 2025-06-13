import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Settings from './pages/Settings';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/SignUpPage';
// import { Navigate, Route, Routes } from 'react-router';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuth();

  console.log("Online users", onlineUsers);
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log( authUser );
  
  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={ authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={ !authUser ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/login' element={ !authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={ authUser ? <ProfilePage /> : <Navigate to='/login' />} /> */} 
            <Route path='/' element={ authUser !== null ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={ authUser === null ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/login' element={ authUser === null ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={ authUser !== null ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App;