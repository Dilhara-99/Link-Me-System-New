import React, { useState } from 'react';
import './Login.css';
import LoginImg from "../Components/LoginImg";
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import { Button, Modal,Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false); // State to control error modal visibility
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
  
    // Reset errors
    setUsernameError('');
    setPasswordError('');

    // Validate username and password
    const usernameRegex = /^\d{4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    let hasError = false;

    if (!username) {
      setUsernameError('Username is required.');
      hasError = true;
    } else if (!usernameRegex.test(username)) {
      setUsernameError('Username should contain 4 numbers.');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      hasError = true;
    }

    if (hasError) {
      return;
    }

    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.success) {
        navigate('/dashboard');
        setLoginStatus('Login successful');
      } else {
        setLoginStatus(response.data.message);
        setErrorModalVisible(true); // Show the error modal
      }
    }).catch((error) => {
      console.log(error);
      setLoginStatus('Please check your username or password');
      setErrorModalVisible(true); // Show the error modal
    });
  }

  const handleSignin = (e) => {
    e.preventDefault();
  
    // Reset errors
    setUsernameError('');
    setPasswordError('');

    // Validate username and password
    const usernameRegex = /^\d{4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    let hasError = false;

    if (!username) {
      setUsernameError('Username is required.');
      hasError = true;
    } else if (!usernameRegex.test(username)) {
      setUsernameError('Username should contain 4 numbers.');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 6 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      hasError = true;
    }

    if (hasError) {
      return;
    }

    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.success) {
        navigate('/dashboard');
        setLoginStatus('Login successful');
      } else {
        setLoginStatus(response.data.message);
        setErrorModalVisible(true); // Show the error modal
      }
    }).catch((error) => {
      console.log(error);
      setLoginStatus('Please check your username or password');
      setErrorModalVisible(true); // Show the error modal
    });
  }

  return (
    <div className=" main">
        <Header/>
        <div style={{paddingBottom:'30px'}}>
        <LoginImg/>
        </div>
            <center>
              <div className="login" style={{borderRadius: '1rem', maxWidth: '500px' ,opacity:'0.9' ,boxShadow:'0 0.188em 1.55em'}}>
                  <h1 className ="hello-msg">Hello</h1>
                  <h3 className ="sign-msg">Sign in to your account</h3>
                  <hr className="hr-line"/>
                  <div className="sub-container">
                    <label htmlFor="username" className="label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={usernameError ? 'is-invalid' : ''}
                      style={styles.input}
                    />
                    {usernameError && <div className="invalid-feedback">{usernameError}</div>}
                  </div>

                  <div className="sub-container">
                    <label htmlFor="password" className="label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={passwordError ? 'is-invalid' : ''}
                      style={styles.input}
                    />
                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                  </div>
                  <hr className="hr-line"/>
                  <a href="">Forget Your Password?</a><br/>
                  <Button variant="primary" onClick={handleSignin} className="btn-signup">
                    Sign in
                  </Button>
                  <br/><br/><br/>
              </div>
            </center>
              <div style={{paddingTop:'50px'}}>
                <Footer/>
              </div>
                <Modal show={errorModalVisible} onHide={() => setErrorModalVisible(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{loginStatus}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setErrorModalVisible(false)}>Close</Button>
                  </Modal.Footer>
                </Modal>
    </div>
  );
};

const styles = {
  input: {
    width: '75%',
    padding: '0.375rem 0.75rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#495057',
    backgroundColor: '#fff',
    border: '1px solid ',
    borderRadius: '0.25rem',
    boxShadow:'0 0.001em 0.1em',
    transition: 'border-color 0.5s ease-in-out',
  },
};

export default Login;
