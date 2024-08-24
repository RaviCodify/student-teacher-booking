import React, { useState, useEffect } from "react";
import axios from "axios";
import { capitalize, fetchIdFromEmail } from "../../utils/utils";
import login from "../../assets/images/login.png"

const Login = ({ onLogin, userRole }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    userRole: userRole,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    setCredentials({
      email: "",
      password: "",
      userRole: userRole,
    });
    setError("");  
  }, [userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        credentials
      );
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const email = response.data.user.email;
        const userId = await fetchIdFromEmail(email);
        onLogin(userRole, userId);        
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.response) {
        console.error("Error response:", error.response.data);
        if (error.response.status === 404) {
          setError("User not found");
        } else {
          setError("Invalid credentials");
        }
      } else {
        setError("There was an error logging in!");
      }
    }
  };

  return (
    <div className="container bg-dark rounded shadow d-flex justify-content-center align-items-center mt-3 mb-5" data-bs-theme="dark">
      <div className="row">
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <img src={login} alt="Login Illustration" className="w-75" />
        </div>
        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="p-4 m-2 rounded w-75"
            autoComplete="off"
          >
            <h2 className="text-center mb-4" style={{color:"#e18b74"}}>
              {capitalize(userRole)} Login
            </h2>
            <div className="mb-3 d-flex border border-secondary rounded bg-dark shadow-sm">
            <label className="p-2" htmlFor="inputEmail"><i className="fa-regular fa-envelope" style={{color:"#e18b74"}}></i></label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="form-control border-0"
                placeholder="Enter email"
                id="inputEmail"
                required
              />
            </div>
            <div className="mb-3 d-flex border border-secondary rounded bg-dark shadow-sm">
              <label className="p-2" htmlFor="inputPassword"><i className="fa-solid fa-lock" style={{color:"#e18b74"}}></i></label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="form-control border-0"
                placeholder="Enter Password"
                id="inputPassword"
                required
              />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <button type="submit" className="btn btn-dark text-black" style={{backgroundColor:"#e18b74"}}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
