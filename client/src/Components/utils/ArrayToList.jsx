import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";


const ArrayToList = ({ array, userRole }) => {
  return (
    <div className="row">
      {array.map((booking) => (
        <div className="col-sm-6" key={booking._id}>
          <div className="card mb-3 bg-dark" data-bs-theme="dark">
            <div className="card-body">
              {userRole === "student" ? (
                <h5 className="card-title">
                  Teacher: {booking.teacher.name}
                </h5>
              ) : (
                <>
                <h5 className="card-title">
                  Student: {booking.student.name}
                </h5>
                <Link className="btn text-dark py-1 mb-2 px-2" style={{backgroundColor:"#e18b74"}} to={`/teacher/messages/${booking.student._id}`}>Message</Link>
                </>
              )}
              <p className="card-text">
                Date: {moment(booking.date).format("Do MMMM")}
              </p>              
              {booking.status === "Pending" && (
                <span className="badge text-dark" style={{backgroundColor:"#dd6a44"}}>
                  {booking.status}
                </span>
              )}
              {booking.status === "Rejected" && (
                <span className="badge text-dark" style={{backgroundColor:"#e12d3f"}}>
                  {booking.status}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArrayToList;
