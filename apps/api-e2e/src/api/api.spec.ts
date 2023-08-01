import axios from 'axios';

describe('GET /', () => {
  const email = 'mofo@yolo.com';
  const password = 'password';

  it('should return a message', async () => {
    const res = await axios.get(`/`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Nothing to see here, move along' });
  });

  it('should return a 404', async () => {
    try {
      await axios.get(`/non-existent-route`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  it('should create a new user with email and ask for password', async () => {
    const res = await axios.post(`/login`, { email });

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ requiresPassword: true });
  });

  it('should create and/or login a user with email and password', async () => {
    const res = await axios.post(`/login`, { email, password });

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ accessToken: expect.any(String) });
  });

  it('should return a 401 if password is incorrect', async () => {
    try {
      await axios.post(`/login`, { email, password: 'wrongpassword' });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  // it('should ask for OTP if last login was more than 7 days ago', async () => {
  //   const res = await axios.post(`/login`, { email, password });

  //   expect(res.status).toBe(200);
  //   expect(res.data).toEqual({ requiresOTP: true });
  // });
});
