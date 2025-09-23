import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isForgotOpen, setForgotOpen] = useState(false); // NEW
  const navigate = useNavigate();

  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const signupNameRef = useRef();
  const signupEmailRef = useRef();
  const signupRoleRef = useRef();
  const signupPasswordRef = useRef();
  const signupConfirmPasswordRef = useRef();
  const forgotEmailRef = useRef(); // NEW

  const openLogin = () => {
    setLoginOpen(true);
    setSignupOpen(false);
    setForgotOpen(false);
    clearInputs();
  };

  const openSignup = () => {
    setSignupOpen(true);
    setLoginOpen(false);
    setForgotOpen(false);
    clearInputs();
  };

  const openForgot = () => {
    setForgotOpen(true);
    setLoginOpen(false);
    setSignupOpen(false);
    clearInputs();
  };

  const closeModals = () => {
    setLoginOpen(false);
    setSignupOpen(false);
    setForgotOpen(false);
  };

  const clearInputs = () => {
    [
      loginEmailRef,
      loginPasswordRef,
      signupNameRef,
      signupEmailRef,
      signupRoleRef,
      signupPasswordRef,
      signupConfirmPasswordRef,
      forgotEmailRef,
    ].forEach(ref => {
      if (ref?.current) ref.current.value = '';
    });
  };

  const handleSignup = () => {
    const fullname = signupNameRef.current.value.trim();
    const email = signupEmailRef.current.value.trim();
    const role = signupRoleRef.current.value.trim();
    const password = signupPasswordRef.current.value;
    const confirmPassword = signupConfirmPasswordRef.current.value;

    if (!fullname || !email || !role || !password || !confirmPassword) {
      alert('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const data = JSON.stringify({ fullname, email, role, password });

    fetch('http://localhost:8087/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => res.text())
      .then(response => {
        const [status, message] = response.split('::');
        alert(message);
        if (status === '200') {
          openLogin();
        }
      })
      .catch(() => alert('Signup failed. Please try again.'));
  };

  const handleLogin = () => {
    const email = loginEmailRef.current.value.trim();
    const password = loginPasswordRef.current.value;

    if (!email || !password) {
      alert('Both fields are required.');
      return;
    }

    const data = JSON.stringify({ email, password });

    fetch('http://localhost:8087/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => res.text())
      .then(response => {
        const [status, payload] = response.split('::');
        if (status === '200') {
          const token = payload;
          sessionStorage.setItem('token', token);

          fetch('http://localhost:8087/users/getfullname', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, csrid: email }),
          })
            .then(res => res.text())
            .then(fullname => {
              sessionStorage.setItem('userid', email);
              sessionStorage.setItem('fullname', fullname);

              fetch(`http://localhost:8087/users/${email}`)
                .then(res => res.json())
                .then(user => {
                  sessionStorage.setItem('role', user.role);
                  navigate('/Home');
                })
                .catch(() => {
                  sessionStorage.setItem('role', 'unknown');
                  navigate('/Home');
                });
            });
        } else {
          alert(payload);
        }
      })
      .catch(() => alert('Login failed. Please try again.'));
  };

  const handleForgotPassword = () => {
    const email = forgotEmailRef.current.value.trim();
    if (!email) {
      alert('Please enter your email.');
      return;
    }

    fetch('http://localhost:8087/users/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(res => res.text())
      .then(message => {
        alert(message);
        openLogin(); 
      })
      .catch(() => alert('Failed to process forgot password request.'));
  };

  return (
    <div id="container">
      <header id="header">
        <div className="logo">
          <img src="/Pet Adopt.jpg" alt="Adoptly Logo" />
          <div className="logoText">Adoptly</div>
        </div>
        <div className="buttons">
          <button className="btn" onClick={openLogin}>Login</button>
          <button className="btn" onClick={openSignup}>Sign up</button>
        </div>
      </header>

      <main id="content">
        <div className="overlay">
          <div className="text1">Welcome to Adoptly</div>
          <div className="text2">Find Your New Best Friend</div>
          <div className="text3">Search for pets available for adoption</div>
        </div>
      </main>

      <footer id="footer">
        <div className="copyrightText">© 2025 Adoptly</div>
        <div className="social-icons">
          <img src="/facebook.png" alt="Facebook" className="socialmediaIcon" />
          <img src="/twitter.png" alt="Twitter" className="socialmediaIcon" />
        </div>
      </footer>

      {(isLoginOpen || isSignupOpen || isForgotOpen) && (
        <div className="modal-overlay active" onClick={closeModals}></div>
      )}

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="modal active">
          <button className="close-icon" onClick={closeModals}>&times;</button>
          <h2>Login to Adoptly</h2>
          <input type="email" placeholder="Email" ref={loginEmailRef} />
          <input type="password" placeholder="Password" ref={loginPasswordRef} />
          <button className="btn" onClick={handleLogin}>Login</button>
          <div className="div2">
            <button className="btn-link" onClick={openForgot}>Forgot Password?</button>
          </div>
          <hr />
          <div className="div2">
            Don't have an Account?
            <button className="btn-outline" onClick={openSignup}>Sign Up Now</button>
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {isSignupOpen && (
        <div className="modal active">
          <button className="close-icon" onClick={closeModals}>&times;</button>
          <h2>Sign Up for Adoptly</h2>
          <input type="text" placeholder="Full Name" ref={signupNameRef} />
          <input type="email" placeholder="Email" ref={signupEmailRef} />
          <label>Select Role</label>
          <select ref={signupRoleRef}>
            <option value=''>Select Role</option>
            <option value='1'>Admin</option>
            <option value='2'>Shelter</option>
            <option value='3'>Adopter</option>
          </select>
          <input type="password" placeholder="Password" ref={signupPasswordRef} />
          <input type="password" placeholder="Confirm Password" ref={signupConfirmPasswordRef} />
          <button className="btn" onClick={handleSignup}>Sign Up</button>
          <hr />
          <div className="div2">
            Already have an account?
            <button className="btn-outline" onClick={openLogin}>Login Now</button>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {isForgotOpen && (
        <div className="modal active">
          <button className="close-icon" onClick={closeModals}>&times;</button>
          <h2>Forgot Password</h2>
          <input type="email" placeholder="Enter your registered email" ref={forgotEmailRef} />
          <button className="btn" onClick={handleForgotPassword}>Send Reset Email</button>
          <hr />
          <div className="div2">
            Remembered your password?
            <button className="btn-outline" onClick={openLogin}>Back to Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
