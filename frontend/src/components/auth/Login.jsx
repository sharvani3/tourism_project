import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "./authcontext";
import { useNavigate } from "react-router-dom";
import '../../styles/login.css';

import loginImg from '../../assets/images/login.jpg';
import userIcon from '../../assets/images/userIcon.png';

const Login = () => {
  const { login } = useContext(AuthContext);  // Access login function from AuthContext
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  });

  const [showPopup, setShowPopup] = useState(false);  // State for controlling the popup

  // Handle form input changes
  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:7800/api/auth/login', credentials);
      const { token, user } = response.data;

      await login(token, user); // Wait for login completion
      setShowPopup(true);       // Show success popup
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  // Close the popup and navigate to the home page
  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/home');  // Navigate to home after closing the popup
    window.location.reload();    // Reload the page after navigation
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="Login" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login Here!</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      required 
                      id="email"
                      onChange={handleChange} 
                    />
                  </FormGroup>
                  <FormGroup>
                    <input 
                      type="password" 
                      placeholder="Password" 
                      required 
                      id="password"
                      onChange={handleChange} 
                    />
                  </FormGroup>
                  <Button className="btn secondary_btn auth_btn" type="submit" style={{ color: 'white' }}>
                    Login
                  </Button>
                </Form>
          
                <p> Don't have an account? <Link to='/register'>Signup</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Popup Modal */}
      <Modal isOpen={showPopup} centered toggle={handleClosePopup}>
        <ModalHeader toggle={handleClosePopup}>Login Successful</ModalHeader>
        <ModalBody>
          You have successfully logged in!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClosePopup}>Close</Button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

export default Login;