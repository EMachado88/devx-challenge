// import styles from './app.module.scss';

import axios from 'axios';
import { useState } from 'react';

const apiUrl = 'http://localhost:3000';

export function App() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
  const [mfaRequired, setMfaRequired] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('accessToken') || '');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Test email address
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const {
        data: { accessToken, requiresMfa, requiresPassword },
      } = await axios.post(`${apiUrl}/login`, { email, ...(password && { password }), otp });

      setMfaRequired(requiresMfa);
      setPasswordRequired(requiresPassword);

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setAccessToken(accessToken);
      }
    } catch (error: any) {
      alert(error.response.data.error);
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
      <h1>XPTO Login Sys</h1>
      <section>
        {accessToken ? (
          <>
            <h3>Logged in</h3>
            <button onClick={handleLogout}>Logout</button>
          </>
          ) : (
          <>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              {!passwordRequired && !mfaRequired && (
                <div className="mt-10">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(event.target.value)
                    }
                  />
                </div>
              )}

              {passwordRequired && (
                <div className="mt-10">
                  <label htmlFor='password'>Password</label>
                  <input
                    id='password'
                    type="password"
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                    }
                    required
                  />
                </div>
              )}

              {mfaRequired && (
                <div className="mt-10">
                  <label htmlFor='otp'>One-Time Password (OTP)</label>
                  <input
                    id='otp'
                    type="text"
                    value={otp}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setOtp(event.target.value)
                    }
                    pattern="\d{6}"
                    maxLength={6}
                    required
                  />
                </div>
              )}
              <button type="submit" className='mt-10'>Login</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
