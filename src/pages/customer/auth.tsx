//auth.tsx
import { useState } from 'react';
import '../../styles/auth/auth.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Auth = () => {
  const navigate = useNavigate();

  const [isBusinessLogin, setIsBusinessLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Forgot password modal
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');

  // Register modal
  const [showRegister, setShowRegister] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // ---------------------------
  // LOGIN LOGIC
  // ---------------------------
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        if (isBusinessLogin) {
          navigate('/business/dashboard');
        } else {
          // If not business, route to your main customer page
          navigate('/customer');
        }
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login.');
    }
  };

  // ---------------------------
  // SWITCH TO BUSINESS LOGIN
  // ---------------------------
  const handleToggleLoginType = () => {
    setIsBusinessLogin((prev) => !prev);
  };

  // ---------------------------
  // FORGOT PASSWORD MODAL
  // ---------------------------
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleCloseModal = () => {
    setShowForgotPassword(false);
    setEmailForReset('');
  };

  const handleSendResetLink = () => {
    alert(`Reset link sent to ${emailForReset}`);
    setShowForgotPassword(false);
  };

  // ---------------------------
  // REGISTER MODAL
  // ---------------------------
  const handleOpenRegister = () => {
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
    setRegisterEmail('');
    setRegisterPassword('');
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registerEmail, password: registerPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        setShowRegister(false);
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="auth-container">
      {/* LOGO */}
      <div className="auth-logo">
        <img src={logo} alt="App Logo" className="fade-in-logo" />
      </div>

      {/* TITLE */}
      <h1 className="auth-title">
        {isBusinessLogin ? 'Business Login' : 'Customer Login'}
      </h1>

      {/* LOGIN FORM */}
      <div className="auth-form slide-up-animation">
        <label htmlFor="username" className="form-label">
          Email
        </label>
        <input
          id="username"
          type="email"
          value={username}
          className="form-input"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth-actions">
          <button
            type="button"
            className="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>

          {/* REPLACE OLD SWITCH BUTTON WITH REGISTER */}
          <button
            type="button"
            className="register-button"
            onClick={handleOpenRegister}
          >
            New here? Register now!
          </button>
        </div>

        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>

      {/* A SMALL LINK FOR SWITCHING TO BUSINESS LOGIN */}
      <div className="switch-login-type">
        <button
          type="button"
          onClick={handleToggleLoginType}
          style={{
            background: 'none',
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginTop: '10px',
            color: '#555',
          }}
        >
          {isBusinessLogin ? 'Switch to Customer Login' : 'Switch to Business Login'}
        </button>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotPassword && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Reset Password</h2>
            <p>Please enter your email address to receive a reset link.</p>
            <input
              type="email"
              placeholder="Your email"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleSendResetLink}>Send Link</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Create an Account</h2>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleRegister}>Register</button>
              <button onClick={handleCloseRegister}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
