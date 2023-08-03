import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface LoginModalProps {
  show: boolean;
  close: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  passwordRequired: boolean;
  setPasswordRequired: (passwordRequired: boolean) => void;
  mfaRequired: boolean;
  setMfaRequired: (mfaRequired: boolean) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function LoginModal(props: LoginModalProps) {
  const {
    show,
    close,
    email,
    setEmail,
    password,
    setPassword,
    otp,
    setOtp,
    passwordRequired,
    mfaRequired,
    handleLogin,
  } = props;

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
          {!passwordRequired && !mfaRequired && (
            <div className="mt-10">
              <Form.Group
                className="mb-3"
                controlId="email"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </Form.Group>
            </div>
          )}

          {passwordRequired && (
            <div className="mt-10">
              <Form.Group
                className="mb-3"
                controlId="password"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                  required
                />
              </Form.Group>
            </div>
          )}

          {mfaRequired && (
            <div className="mt-10">
              <Form.Group
                className="mb-3"
                controlId="otp"
              >
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="otp"
                  value={otp}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setOtp(event.target.value)
                  }
                  pattern="\d{6}"
                  maxLength={6}
                  required
                />
              </Form.Group>
            </div>
          )}
          <Button type="submit" variant="primary" className='w-100'>
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
