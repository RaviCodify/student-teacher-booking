import React from 'react';

const Testimonials = () => {
  return (
    <>
      <section className="testimonials p-5 mb-5 bg-dark">
        <div className="container text-light">
          <h2 className="text-center mb-4" style={{color:"#e18b74"}}>What Our Users Say</h2>
          <div className="row">
            <div className="col-md-6">
              <blockquote className="blockquote text-center">
                <p>"This platform has changed the way I learn. The teachers are amazing!"</p>
                <div className="d-flex flex-column">
                <footer className="blockquote-footer m-0"  style={{color:"#e18b74"}}>Jane Doe </footer>
                <p className="text-secondary" style={{fontSize:"13px", color:"black"}}>Student</p>
                </div>
              </blockquote>
            </div>
            <div className="col-md-6">
              <blockquote className="blockquote text-center">
                <p>"I’ve connected with so many students. It’s a fantastic way to teach!"</p>
                <div className="d-flex flex-column">
                <footer className="blockquote-footer m-0"  style={{color:"#e18b74"}}>John Smith </footer>
                <p className="text-secondary" style={{fontSize:"13px", color:"black"}}>Teacher</p>
                </div>
              </blockquote>
            </div>            
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
