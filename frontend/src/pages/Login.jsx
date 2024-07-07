import React from "react";
import{Container,Row,Col,Form, FormGroup, Button } from 'reactstrap';
import { useState, useContext}  from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../components/authcontext";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'


import loginImg from '../assets/images/login.jpg'
import userIcon from '../assets/images/userIcon.png'
 // node
 //const axios = require ('axios')


 const Login = () =>{

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const[credentials,setCredentials]= useState({
    email :undefined,
    password :undefined

  });

  const handleChange = e =>{
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}));
  };


  const handleClick = async(e) => {
    e.preventDefault();

    const email =credentials.email;
    const password =credentials.password;
    try {
      const response = await axios.post('http://localhost:7800/api/auth/login', { email, password });
      const { token, user } = response.data;
      login(token, user.id ,true);
      
      // toast.success('Login successful!');
      alert("you have loggedin successfully");
      navigate('/home');
    } catch (err) {
      console.error("Login ", err);
     
    }
    
  }

  return (
  <section>
    <Container>
      <Row>
        <Col lg='8' className="m-auto">
        <div className="login__container d-flex justify-content-between">
          <div className="login__img">
            <img src={loginImg} alt=""/>
          </div>
          <div className="login__form">
            <div className="user">
            <img src={userIcon} alt="" />  
            </div>
            <h2>Login</h2>

            <Form onSubmit={handleClick}>
              <FormGroup >
                <input type = "email" placeholder="Email" required id ="email"
                onChange={handleChange}/>
              </FormGroup>
              <FormGroup>
                <input type = "password" placeholder="password" required id ="password"
                onChange={handleChange}/>
              </FormGroup>
              <Button className="btn secondary__btn auth__btn" type="submit">Login</Button>
            </Form>
            <p> Don't have an account?<Link to ='/register' >create</Link></p>

          </div>
        </div>

        </Col>
      </Row>
    </Container>
  </section>
  );
 };
 export default Login;