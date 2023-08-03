import { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { Home } from './pages/home';
import { Header } from './components/header';
import { LoginModal } from './components/login-modal';

import appRoutes from './constants/app-routes';

const apiUrl = 'http://localhost:3000';

export function App() {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const closeLogin = () => setShowLogin(false);
  const openLogin = () => {
    if (!accessToken) {
      setShowLogin(true);
    } else {
      navigate('/account');
    }
  };

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const [mfaRequired, setMfaRequired] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem('accessToken') || ''
  );

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Test email address
    if (
      !passwordRequired &&
      !mfaRequired &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    ) {
      setToastMessage('Please enter a valid email address.');
      setShowToast(true);
      return;
    }

    // Test password
    if (
      passwordRequired &&
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,30}$/.test(password)
    ) {
      setToastMessage(
        'Password must be 8-30 characters long and contain at least one uppercase letter, one number and one special character.'
      );
      setShowToast(true);
      return;
    }

    try {
      const {
        data: { accessToken, requiresMfa, requiresPassword },
      } = await axios.post(`${apiUrl}/login`, {
        email,
        ...(password && { password }),
        otp,
      });

      setMfaRequired(requiresMfa);
      setPasswordRequired(requiresPassword);

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);
        navigate(appRoutes.account);
        setShowLogin(false);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setToastMessage(error.response.data.message);
      setShowToast(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken('');
    setEmail('');
    setPassword('');
    setOtp('');
  };

  return (
    <div>
      <Header
        openLogin={openLogin}
        loggedIn={!!accessToken}
        logout={handleLogout}
      />
      <Routes>
        <Route path={appRoutes.home} element={<Home openLogin={openLogin} />} />
        <Route
          path={appRoutes.account}
          element={
            accessToken ? (
              <main className="p-5">
                <h1>Account</h1>
                <p>This is protected</p>
              </main>
            ) : (
              <Navigate to={appRoutes.home} />
            )
          }
        />
      </Routes>

      <LoginModal
        show={showLogin}
        close={closeLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        otp={otp}
        setOtp={setOtp}
        passwordRequired={passwordRequired}
        setPasswordRequired={setPasswordRequired}
        mfaRequired={mfaRequired}
        setMfaRequired={setMfaRequired}
        handleLogin={handleLogin}
      />

      <ToastContainer position="bottom-center" style={{ zIndex: 1056 }}>
        <Toast
          bg="danger"
          show={showToast}
          className="d-inline-block m-1"
          autohide
          animation
          onClose={() => setShowToast(false)}
        >
          <Toast.Header closeButton>
            <span className="me-auto">{toastMessage}</span>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
