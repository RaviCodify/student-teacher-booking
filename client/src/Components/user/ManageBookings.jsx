import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import moment from "moment";
import withReactContent from 'sweetalert2-react-content';
import { handleDelete } from "../../utils/utils";

const MySwal = withReactContent(Swal);

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((response) => {
                const filteredBookings = response.data.filter(
          (booking) => booking.teacher !== null && booking.student !== null
        );
        setBookings(filteredBookings);
        if (filteredBookings.length === 0) {
          setMessage("No bookings found");
        } else {
          setMessage("");
        }
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const updateStatus = (id, status) => {
    axios
      .patch(`http://localhost:5000/api/bookings/update/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      })
      .then((response) => {
        setMessage(`${response.data.student.name} booking status updated to ${status}`);
        setBookings(
          bookings.map((booking) =>
            booking._id === id ? response.data : booking
          )
        );
      })
      .catch((error) => setMessage("Error updating booking status: " + error.message));
  };

  const changeStatus = (id, currentStatus) => {
    MySwal.fire({
      title: 'Change Status',
      text: "Select a new status",
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Pending',
      showDenyButton: true,
      denyButtonText: 'Reject',
    }).then((result) => {
      if (result.isDenied && currentStatus !== 'Rejected') {
        updateStatus(id, 'Rejected');
        Swal.fire('Rejected', 'Booking status has been updated.', 'success');
      } else if (result.isConfirmed && currentStatus !== 'Approved') {
        updateStatus(id, 'Approved');
        Swal.fire('Approved', 'Booking status has been updated.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel && currentStatus !== 'Pending') {
        updateStatus(id, 'Pending');
        Swal.fire('Pending', 'Booking status has been updated.', 'success');
      }
    });
  };
  

  const deleteBooking = (id) => {
    handleDelete(() => {
      axios
        .delete(`http://localhost:5000/api/bookings/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })        
        .then((response) => {
          console.log("Delete response data:", response.data);
          const studentName = response.data?.booking.student?.name;
          setMessage(studentName
            ? `${studentName}'s booking deleted`
            : "Booking deleted");
          setBookings(bookings.filter((booking) => booking._id !== id));
        })
        .catch((error) => {
          console.error("There was an error deleting the booking!", error);
          setMessage("Error deleting booking: " + error.message);
        });
    });
  };
  

  return (
    <div className="mb-3">
      <h2 className="my-2 text-white">Manage Bookings</h2>
      {message && <p className="text-white">{message}</p>}
      <ul className="list-group">
        {bookings.map((booking) => (
          <li
            key={booking._id}
            className="list-group-item bg-dark border border-secondary my-1"
            data-bs-theme='dark'
          >
            <p className="mx-2 text-light" >
              {booking.student.name} booked{" "}
              {booking.teacher.name} for{" "}
              {moment(booking.date).format("Do MMMM")}
            </p>
            <div className="d-flex justify-content-between my-2">
              <div
                className="status-button btn btn-dark text-black"
                style={{backgroundColor:"#e18b74"}}
                onClick={() => changeStatus(booking._id, booking.status)}
              >
                {booking.status}
              </div>
              <button
                className="btn btn-dark text-dark"
                style={{backgroundColor:"#e18b74"}}
                onClick={() => deleteBooking(booking._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageBookings;
