// src/pages/admin/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import adminCat from "../../assets/images/adminCat.png"

const AdminDashboard = ({ userRole }) => {
  return (
    <div>
      <div className="list-group w-75 w-lg-50 mx-auto mt-4 mb-3 ">      
      <div
        className="col-md-5 d-flex w-100 justify-content-center align-items-center"
        style={{ backgroundColor: "#181818" }}
      >
        <img
          src={adminCat}
          alt="Sign Up Illustration"
          className="w-75 rounded"
        />
      </div>
        <Link
          className="list-group-item border border-dark text-center list-group-item-action list-group-item-success"
          to="/admin/teachers"
        >
          Teacher List
        </Link>
        <Link
          className="list-group-item border border-dark text-center list-group-item-action list-group-item-warning"
          to="/admin/book-manage"
        >
          Manage Bookings
        </Link>        
        <Link className="list-group-item border border-dark text-center list-group-item-action list-group-item-danger" to="/admin/students">
          Student List
        </Link>                    
    </div>
    
    </div>
  );
};

export default AdminDashboard;
