import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { capitalize, handleAuth } from "../../utils/utils";
import { useNavigate } from 'react-router-dom'; 

const Navbar = ({ isLoggedIn, onLogout, userRole, userId }) => {
  const navigate = useNavigate()
  const [navbarTitle, setNavbarTitle] = useState("Teachers from Saturn");
  const [navTitlePath, setNavTitlePath] = useState("/");

  
  useEffect(() => {
    if (userRole) {
      setNavbarTitle(`${capitalize(userRole)} Dashboard`);
      setNavTitlePath(userRole==="admin" ? `/${userRole}/dashboard` : `/${userRole}/dashboard/${userId}`);
    } else {
      setNavbarTitle("Teachers from Saturn");
      setNavTitlePath("/");
    }
  }, [userRole, userId]);

  const handleNavCollapse = () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
    }
  };


  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to={navTitlePath}>
          {navbarTitle}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            
            <li className="nav-item">
              <Link className="nav-link" to="/"  onClick={handleNavCollapse}>
                Home
              </Link> 
            </li>

            {!isLoggedIn && (
              <>
              <li className="nav-item">
              <button className="nav-link" onClick={() => {handleAuth("signup", navigate); handleNavCollapse()}}>Signup</button>
              </li>
              <li className="nav-item">
              <button className="nav-link" onClick={() => {handleAuth("login", navigate); handleNavCollapse()}}>Login</button>
              </li>
              </>
            )}           
            
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={()=>{onLogout(), handleNavCollapse()}}>
                  Logout
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
