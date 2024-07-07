import { useState }  from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
 // node
 //const axios = require ('axios')
function Register() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  //const axios = require('axios/dist/browser/axios.cjs'); // browser

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(username,email,password)
    try {
      const result = await axios.post('http://localhost:7800/api/auth/signup', {
        username,
        email,
        password,
      });
      console.log(result);
      alert('User signed up successfully');
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
    }
  };


  return (
   
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Name</strong>
            </label>
            <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            name="username"
            className="form-control rounded=0"
            onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlForm="email">
              <strong>Email</strong>

            </label>
            <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            className="form-control rounded-0"
            onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className="mb-3">
            <label htmlForm="email">
              <strong>Password</strong>
            </label>
            <input
            type="password"
            plaaceholder="Enter Password"
            name="password"
            className="form-control rounded-0 "
            onChange={(e) => setPassword(e.target.value)}

            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register 
          </button>
          </form>
          <p>Already Have an Account</p>
          <Link to="/login" button className="btn btn-default border w-100 bg-light rounded-0">
            Login
          </Link>
        
      </div>
    </div>
 );
}

export default Register;