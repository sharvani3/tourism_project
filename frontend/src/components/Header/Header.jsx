import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../auth/authcontext';
import logo from '../../assets/images/logo2.png';
import './header.css';

const nav__links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
];

const Header = () => {
  const { isLoggedIn, logout, userName } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [change,setChange]=useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  // Close menu when login status changes
  // useEffect(() => {

  //   const fetchData=async()=>{
  //     setMenuOpen(false);
  //   if(isLoggedIn){
  //     await setChange(userName);
  //   }

  //   };
  //   fetchData();
  // }, [isLoggedIn,change,userName]);
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("userName:", userName);
}, [isLoggedIn, userName]);

  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) => navClass.isActive ? 'active__link' : ''}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
                {isLoggedIn && (
                  <>
                    <li className="nav__item">
                      <NavLink 
                        to="/mytrips" 
                        className={(navClass) => navClass.isActive ? 'active__link' : ''}
                      >
                        My Trips
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <span id="wel" className="welcome-msg">Welcome, {userName}!</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="nav__right d-flex align-items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Button className="btn primary__btn">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="btn primary__btn">
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              ) : (
                <div className="menu__icon" onClick={toggleMenu}>
                  <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
                </div>
              )}
            </div>
          </div>
          
          {menuOpen && isLoggedIn && (
            <div className="dropdown__menu">
              <Link className="dropdown__item" to="/profile">Profile</Link>
              <div className="dropdown__item" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </Row>
      </Container>
    </header>
  );
};

export default Header;