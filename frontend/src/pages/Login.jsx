import React from "react";
import{Container,Row,Col,Form, FormGroup, Button } from 'reactstrap';
import { useState }  from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../styles/login.css'


import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
 // node
 //const axios = require ('axios')


 const Login = () =>{

  const[credentials,setCredentials]= useState({
    email :undefined,
    password :undefined

  });

  const handleChange = e =>{
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value}));
  };


  const handleClick = e => {
    e.preventDefault();
  }

  return (
  <section>
    <Container>
      <Row>
        <col lg='8' className="m-auto">
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

        </col>
      </Row>
    </Container>
  </section>
  );
 };
 export default Login;