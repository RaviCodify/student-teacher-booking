import React from "react";
import { useLocation } from "react-router-dom";

const TeacherDetail = () => {
  const location = useLocation();
  const { userName, userEmail, userSubject, userId } = location.state || {};
  
  return (
    <div className="container mt-4 p-3 bg-dark text-white rounded">
      <h2 style={{color:"#e18b74"}}>{userName ? userName : 'User'}'s Profile</h2>
      <p>ID: {userId}</p>
      <p>Subject: {userSubject}</p>
      <p>Email: {userEmail}</p>
      </div>
  );
};

export default TeacherDetail;
