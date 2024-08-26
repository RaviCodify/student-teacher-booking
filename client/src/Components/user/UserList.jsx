import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { capitalize, handleDelete } from "../../utils/utils";

const UserList = ({ userType, isLoggedIn, userRole }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType === "student" && userRole !== "admin") {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [userType, userRole, navigate]);

  const fetchUsers = () => {
    const endpoint = userType === "teacher" 
      ? "http://localhost:5000/api/public/teachers" 
      : "http://localhost:5000/api/user";
  
    axios
      .get(endpoint, {
        params: { userType },
        headers: userType !== "teacher" ? {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        } : {},
      })
      .then((response) => {
        setUsers(response.data.filter((user) => user.role === userType));
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
  

  const deleteUser = (id) => {
    handleDelete(() => {
      axios
        .delete(`http://localhost:5000/api/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          setUsers(users.filter((user) => user._id !== id));
        })
        .catch((error) => {
          console.error("There was an error deleting the user!", error);
        });
    });
  };

  return (
    <div>
      <h2 className="m-2"  style={{color:"#e18b74"}}>{capitalize(userType)}'s List</h2>
      <ul className="list-group">
        {users.map((user, index) => (
          <li
            className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center"
            data-bs-theme="dark"
            key={user._id}
          >
            {index + 1 + "."} {user.name}
            <div className="modify-item">
              {userType === "teacher" && <Link to={`/teacher-detail`} style={{backgroundColor:"#e18b74"}} state={{ userName: user.name, userEmail: user.email, userSubject: user.subject, userId: user._id }} className="btn text-dark"><i className="fa-solid fa-user"></i></Link>}
              {isLoggedIn && userRole === "student" && userType === "teacher" && (
                <>
                  <Link to={`/student/bookings/${user._id}`} className="btn text-dark mx-2" style={{backgroundColor:"#e18b74"}}><i className="fa-solid fa-calendar-check"></i></Link>
                  <Link to={`/student/messages/${user._id}`} className="btn" style={{backgroundColor:"#e18b74"}}><i className="fa-solid fa-message"></i></Link>
                </>
              )}
              {isLoggedIn && userRole === 'admin' && (
            
            <button className="btn mx-3 text-dark" style={{backgroundColor:"#e18b74"}} onClick={() => deleteUser(user._id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
