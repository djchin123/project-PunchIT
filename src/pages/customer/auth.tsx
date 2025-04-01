import { useState } from 'react';
import '../../styles/auth/auth.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';  

const Auth = () => {
  const navigate = useNavigate();

  const [isBusinessLogin, setIsBusinessLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // For forgot-password modal
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [emailForReset, setEmailForReset] = useState('');

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

  const handleToggleLoginType = () => {
    setIsBusinessLogin(prev => !prev);
  };

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

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src={logo} alt="App Logo" className="fade-in-logo" />
      </div>

      <h1 className="auth-title">
        {isBusinessLogin ? 'Business Login' : 'Customer Login'}
      </h1>

      <div className="auth-form slide-up-animation">
        <label htmlFor="username" className="form-label">Email</label>
        <input
          id="username"
          type="email"
          value={username}
          className="form-input"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="form-label">Password</label>
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

          <button
            type="button"
            className="toggle-login"
            onClick={handleToggleLoginType}
          >
            Switch to {isBusinessLogin ? 'Customer' : 'Business'} Login
          </button>
        </div>

        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>

      {/* Modal Popup for Forgot Password */}
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
    </div>
  );
};

export default Auth;
