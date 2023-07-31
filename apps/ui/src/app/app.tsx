// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './app.module.scss';

import axios from 'axios';
import { useState } from 'react';

const apiUrl = 'http://localhost:3000';

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
      const { data } = await axios.post(`${apiUrl}/login`, { email });
      console.log(data);
    } catch (error) {
      alert('Login failed!');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>XPTO Sys</h1>
      <section>
        <h3>Login</h3>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="email">Email*</label>
          </div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  );
}

export default App;
