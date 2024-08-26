import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBookings } from "../../utils/utils";
import ArrayToList from "../../Components/utils/ArrayToList";

const TeacherDashboard = ({ userRole, userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      const { approvedBooking } = await fetchBookings(userId, userRole);
      setBookings(approvedBooking);
    };

    if (userId) {
      getBookings();
    }
  }, [userId, userRole]);

  return (
    <div className="container-fluid text-white px-sm-5 py-sm-3">
      <div className="my-3 d-md-flex align-item-center justify-content-between">
        <h1>Teacher Dashboard</h1>
        <Link to="/teacher/messages" className="btn text-dark my-2" style={{backgroundColor:"#e18b74"}}>
          View Messages
        </Link>
      </div>
      {bookings.length !== 0 ? (
        <div>
          <h5>Approved Bookings</h5>
          <ArrayToList array={bookings} userRole={userRole} />
        </div>
      ) : (
        <h5>No Bookings Found</h5>
      )}
    </div>
  );
};

export default TeacherDashboard;
