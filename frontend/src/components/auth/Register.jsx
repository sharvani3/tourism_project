import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../../styles/register.css';

import regImg from '../../assets/images/regimg.png'
import userIcon from '../../assets/images/userIcon.png'
import { Container,Row,Col } from "reactstrap";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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



  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="reg__container d-flex justify-content-between">
              <div className="reg__img">
                <img src={regImg} alt=""/>
              </div>
              <div className="reg__form">
                <div className="user">
                  <img src={userIcon} alt=""/>
                </div>
                <h2>Sign Up Here!</h2>
                <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
        <p>Already Have an Account?<Link to='/login'>login</Link></p>

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Register;
