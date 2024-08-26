import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBookings } from "../../utils/utils";
import ArrayToList from "../../Components/utils/ArrayToList";

const StudentDashboard = ({ userRole, userId }) => {
  const [approvedBooking, setApprovedBooking] = useState([]);
  const [otherBooking, setOtherBooking] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      const { approvedBooking, otherBooking } = await fetchBookings(
        userId,
        userRole
      );
      setApprovedBooking(approvedBooking);
      setOtherBooking(otherBooking);
    };

    if (userId) {
      getBookings();
    }
  }, [userId, userRole]);

  return (
    <div className="container-fluid text-white px-sm-5 py-sm-3">
      <div className="header my-4">
        <h2>Welcome to Your Dashboard</h2>
        <div className="d-flex">
          <Link to="/student/teachers" className="btn text-black mx-2"  style={{backgroundColor:"#e18b74"}}>
            View Teachers
          </Link>
          <Link to="/student/messages" className="btn text-black mx-1"  style={{backgroundColor:"#e18b74"}}>
            View Messages
          </Link>
        </div>
      </div>
      {approvedBooking.length !== 0 && (
        <div className="my-4">
          <h5>Approved Bookings</h5>
          <ArrayToList array={approvedBooking} userRole={userRole} />
        </div>
      )}
      {otherBooking.length !== 0 && (
        <div className="my-4">
          <h5>Other Bookings</h5>
          <ArrayToList array={otherBooking} userRole={userRole} />
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
