import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedTeachers = () => {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
      fetchUsers();
  }, []);

  const fetchUsers = () => {  
    axios
      .get("http://localhost:5000/api/public/teachers")
      .then((response) => {
        setTeachers(response.data.filter((user) => user.role === 'teacher'));
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
  
  return (
    <>
    {teachers.length>0 && <section className="featured-teachers text-light bg-dark my-4 p-3" data-bs-theme="dark">
      <div className="container">
        <h2 className="text-center mb-4" style={{color:"#e18b74"}}>Featured Teachers</h2>
        <div className="row">
          {teachers.slice(0,3).map((teacher) => (
            <div key={teacher._id} className="col-md-4">
              <div className="card text-light bg-dark  mb-4">
                <div className="card-body text-center">
                  <h5 className="card-title">{teacher.name}</h5>
                  <p className="card-text">{teacher.subject}</p>
                  <p className="card-text">Email: {teacher.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/teachers" className="btn btn-dark text-black" style={{backgroundColor:"#e18b74"}}>See All Teachers</Link>
        </div>
      </div>
    </section>}
    </>
  );
};

export default FeaturedTeachers;
