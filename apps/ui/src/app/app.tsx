// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.module.scss';

import axios from 'axios';
import { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  const [email, setEmail] = useState<string>('');

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Test email address
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3000/login', { email });
      console.log(data);
    } catch (error) {
      alert('Login failed!');
      console.error(error);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <section>
              <form onSubmit={handleLoginSubmit}>
                <div>
                 <label htmlFor="email">Email*</label>
                </div>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <button type="submit">Login</button>
              </form>
            </section>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
