// pages/customer/auth.tsx
import { useState } from 'react';
import '../../styles/auth/auth.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Auth = () => {
  const nav = useNavigate();

  /* ---------------------------------------------------- *
   *  shared state
   * ---------------------------------------------------- */
  const [isBusinessLogin, setIsBusinessLogin] = useState(false);

  /*  LOGIN  ------------------------------------------------ */
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const r = await fetch('http://localhost:3001/api/login', {
        method : 'POST',
        headers: { 'Content-Type':'application/json' },
        body   : JSON.stringify({ email, password })
      });
      const json = await r.json();
      if (!r.ok) return alert(json.error || 'Login failed');

      // store user id for later API calls
      localStorage.setItem('punchit_user', json.user.user_id);
      localStorage.setItem('punchit_userType', json.user.user_type);

      nav(json.user.user_type === 'business_owner'
            ? '/business/dashboard'
            : '/customer');
    } catch(e){
      console.error(e);
      alert('Network error during login');
    }
  };

  /*  REGISTER  ------------------------------------------- */
  const [showReg, setShowReg] = useState(false);
  const [reg, setReg] = useState({
    first_name:'', last_name:'', email:'', password:'',
    phone:'', date_of_birth:'', user_type:'customer'
  });

  const handleRegister = async () => {
    try {
      const r = await fetch('http://localhost:3001/api/register', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(reg)
      });
      const j = await r.json();
      if (!r.ok) return alert(j.error || 'Registration failed');

      alert(`Registered! Your referral code is ${j.referral_code}`);
      setShowReg(false);
    }catch(e){
      console.error(e);
      alert('Registration error');
    }
  };

  /* ---------------------------------------------------- */
  return (
    <div className="auth-container">
      {/* logo */}
      <div className="auth-logo">
        <img src={logo} alt="App Logo" className="fade-in-logo"/>
      </div>

      <h1 className="auth-title">
        {isBusinessLogin ? 'Business Login' : 'Customer Login'}
      </h1>

      {/* LOGIN FORM ------------------------------------ */}
      <div className="auth-form slide-up-animation">
        <label className="form-label">Email</label>
        <input type="email" className="form-input"
               value={email} onChange={e=>setEmail(e.target.value)}/>

        <label className="form-label">Password</label>
        <input type="password" className="form-input"
               value={password} onChange={e=>setPassword(e.target.value)}/>

        <div className="auth-actions">
          <button className="register-button" onClick={()=>setShowReg(true)}>
            New here? Register now!
          </button>
        </div>

        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>

      <div className="switch-login-type">
        <button
          style={{background:'none',border:'none',textDecoration:'underline',cursor:'pointer',marginTop:'10px'}}
          onClick={()=>setIsBusinessLogin(p=>!p)}
        >
          {isBusinessLogin ? 'Switch to Customer Login' : 'Switch to Business Login'}
        </button>
      </div>

      {/* REGISTER MODAL -------------------------------- */}
      {showReg && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Create an Account</h2>

            <label>First name</label>
            <input value={reg.first_name}
                   onChange={e=>setReg({...reg,first_name:e.target.value})}/>

            <label>Last name</label>
            <input value={reg.last_name}
                   onChange={e=>setReg({...reg,last_name:e.target.value})}/>

            <label>Email</label>
            <input type="email" value={reg.email}
                   onChange={e=>setReg({...reg,email:e.target.value})}/>

            <label>Password</label>
            <input type="password" value={reg.password}
                   onChange={e=>setReg({...reg,password:e.target.value})}/>

            <label>Phone</label>
            <input value={reg.phone}
                   onChange={e=>setReg({...reg,phone:e.target.value})}/>

            <label>Date of birth</label>
            <input type="date" value={reg.date_of_birth}
                   onChange={e=>setReg({...reg,date_of_birth:e.target.value})}/>

            <label>Account type</label>
            <select
              value={reg.user_type}
              onChange={e=>setReg({...reg,user_type:e.target.value})}
            >
              <option value="customer">Customer</option>
              <option value="business_owner">Business</option>
            </select>

            <div className="modal-buttons">
              <button onClick={handleRegister}>Register</button>
              <button onClick={()=>setShowReg(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
