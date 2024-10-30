import React, { useContext } from 'react';
import { AuthContext } from '../components/auth/authcontext'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/profile.css';

const Profile = () => {
  const { userName, userEmail, logout } = useContext(AuthContext); // Destructure logout here
  const navigate = useNavigate(); // For navigation after logout

  

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <label>Email:</label>
        <p>{userEmail || " "}</p>
      </div>
      <div className="profile-info">
        <label>Username:</label>
        <p>{userName || " "}</p>
     </div>
   
    </div>
  );
};

export default Profile;
