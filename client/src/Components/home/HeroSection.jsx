import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';



const HeroSection = () => {
  return (
    <section className="hero-section d-flex flex-column align-items-center bg-dark py-3 mt-4" data-bs-theme="dark">
        <div className='container d-flex justify-content-center mt-5'>
            {<img src={logo} alt="logo" className='w-75' />}
        </div>
      <div className="container text-center text-white mt-3">
        <h1 className="display-4">Connect with Your Ideal Teacher Today!</h1>
        <p className="lead">Book appointments with experienced teachers across a range of subjects and skills.</p>
        <div className="mt-4">
          <Link to="/teachers" className="btn btn-dark text-black mx-2"style={{backgroundColor:"#e18b74"}}>Find a Teacher</Link>
          <Link to="/teacher/signup" className="btn btn-dark text-black mx-2"style={{backgroundColor:"#e18b74"}}>Join as a Teacher</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
