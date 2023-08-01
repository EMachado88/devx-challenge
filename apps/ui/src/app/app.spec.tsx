import { fireEvent, render, waitFor } from '@testing-library/react';
import jest from 'jest-mock';

import { BrowserRouter } from 'react-router-dom';

import App from './app';

window.alert = jest.fn();

const email = 'mofo@yolo.com';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByText(/XPTO Login Sys/gi)).toBeTruthy();
  });

  it('should have a login form', () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(getByLabelText(/Email/gi)).toBeTruthy();
  });

  it('should have a login button', () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(queryByRole('button')?.getAttribute('type')).toBe('submit');
  });

  it('should show an alert if the email is invalid', async () => {
    const { getByRole, getByLabelText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const emailInput = getByLabelText(/Email/gi) as HTMLInputElement;
    const loginButton = getByRole('button') as HTMLButtonElement;

    emailInput.focus();
    emailInput.blur();

    loginButton.click();

    expect(window.alert).toBeCalledTimes(1);
  });

  it('should render password input if the email is valid', async () => {
    const { getByRole, getByLabelText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const emailInput = getByLabelText(/Email/gi) as HTMLInputElement;
    const loginButton = getByRole('button') as HTMLButtonElement;

    emailInput.focus();
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.click(loginButton);

    const passwordInput = await waitFor(() => getByLabelText(/Password/gi))

    expect(passwordInput).toBeTruthy();
  });

  it('should show an alert if the password is invalid', async () => {
    const { getByRole, getByLabelText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const emailInput = getByLabelText(/Email/gi) as HTMLInputElement;
    const loginButton = getByRole('button') as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.click(loginButton);

    const passwordInput = await waitFor(() => getByLabelText(/Password/gi))

    fireEvent.change(passwordInput, { target: { value: '123' } });

    expect(window.alert).toBeCalledTimes(1);
  });
});
