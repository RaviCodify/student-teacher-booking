import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { capitalize } from "../../utils/utils";
import signup from "../../assets/images/signup.png"

const SignUp = ({ userRole }) => {
  const navigate = useNavigate();
  const [isHuman, setIsHuman] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    subject: "",
    email: "",
    password: "",
    rePassword: "",
    userRole: userRole,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      userRole: userRole,
    }));
  }, [userRole]);

  const handleCheckbox = (e) => {
    setIsHuman(e.target.checked)
  }

  const isFormValid = () => {
    return (
      isHuman &&
      formState.name.trim() !== "" &&
      formState.email.trim() !== "" &&
      formState.password.trim() !== "" &&
      formState.rePassword.trim() !== "" &&
      (userRole !== "teacher" || formState.subject.trim() !== "")
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.password.length < 8 || formState.password.length > 20) {
      setError("Password must be 8 - 20 characters long.");
      return;
    }
    const specialCharRegex = /['!@#$%^&*(),.?":;-_`~/{}|<>]/g;
    if (!specialCharRegex.test(formState.password)) {
      setError("Password must include at least one special character.");
      return;
    }
    if (formState.password !== formState.rePassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formState
      );
      console.log(response);
      
      setSuccess("Sign up successful!");
      setError("");
      setFormState({ name: "", subject: "", email: "", password: "", rePassword: "", userRole: userRole });
      setTimeout(() => {
        navigate(`/${userRole}/login`);
      }, 1000);
      
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || err.message);
      setFormState({ name: "", subject: "", email: "", password: "", rePassword: "", userRole: userRole });
      setSuccess("");
    }
  };

  return (
    <div className="container d-flex bg-dark rounded shadow justify-content-center align-items-center mt-3 mb-5 mb-md-0" data-bs-theme="dark">
      <div className="row">        
        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <form
            onSubmit={handleSubmit}
            className="p-4 m-2 rounded w-75"
            autoComplete="off"
          >
            <h2 className="text-center mb-4" style={{color:"#e18b74"}}>
            {capitalize(userRole)} Signup
            </h2>
            <div className="mb-3 d-flex border border-secondary rounded bg-dark shadow-sm">
            <label className="p-2" htmlFor="inputName"><i className="fa-solid fa-user" style={{color:"#e18b74"}}></i></label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="form-control border-0"
                placeholder="Enter Name"
                id="inputName"
                required
              />
            </div>
            {userRole==='teacher' && <div className="mb-3 d-flex border border-secondary rounded bg-dark shadow-sm">
            <label className="p-2" htmlFor="inputSubject"><i className="fa-solid fa-book" style={{color:"#e18b74"}}></i></label>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="form-control border-0"
                placeholder="Enter Subject"
                id="inputSubject"
                required
              />
            </div>}
            <div className="mb-3 d-flex border border-secondary rounded bg-dark shadow-sm">
            <label className="p-2" htmlFor="inputEmail"><i className="fa-regular fa-envelope" style={{color:"#e18b74"}}></i></label>
              <input
                type="email"
                name="email"
                value={formState.email}
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
                value={formState.password}
                onChange={handleChange}
                className="form-control border-0"
                placeholder="Enter Password"
                id="inputPassword"
                required
              />
            </div>
            <div className="mb-3 d-flex border border-secondary rounded bg-dark shadow-sm">
              <label className="p-2" htmlFor="inputRePassword"><i className="fa-solid fa-repeat" style={{color:"#e18b74"}}></i></label>
              <input
                type="password"
                name="rePassword"
                value={formState.rePassword}
                onChange={handleChange}
                className="form-control border-0"
                placeholder="Repeat Password"
                id="inputRePassword"
                required
              />
            </div>
            <div className="mb-3">
              <input type="checkbox" name="check" id="inputCheck" onChange={handleCheckbox} className="mx-2"/>
              <label className="form-check-label text-success-emphasis" htmlFor="inputCheck">I am a human</label>
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            {success && <div className="text-success mb-3">{success}</div>}
            <button type="submit" className="btn text-black"  style={{backgroundColor:"#e18b74"}} disabled={!isFormValid()}>
              Register
            </button>
          </form>
        </div>
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <img src={signup} alt="Sign Up Illustration" className="w-75"/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
