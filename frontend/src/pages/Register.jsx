import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
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

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="regc p-4 rounded w-25">
        <h2 className="regtitle">Register Here!</h2>
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
              className="form-control rounded"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="regbtn btn w-100 rounded">
            Register
          </button>
        </form>
        <p>Already Have an Account?</p>
        <button onClick={handleLoginClick} className="loginbtn btn w-100 rounded">
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
