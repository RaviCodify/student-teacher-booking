import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { fetchIdFromEmail } from "../../utils/utils";

const BookTeacher = ({ userId }) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { teacherId } = useParams();
  const navigate = useNavigate(); 

  const validateDate = (selectedDate) => {
    const currentDate = new Date();
    const chosenDate = new Date(selectedDate);
    return chosenDate >= currentDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDate(date)) {
      setMessage("Please select a valid future date.");
      return;
    }

    const studentId = await fetchIdFromEmail(email);
    if (studentId === userId) {
      axios
        .post("http://localhost:5000/api/bookings/book", {
          studentId,
          teacherId,
          date,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then((response) => {
          setMessage("Booking request sent!");

          setTimeout(() => {
            navigate(`/student/dashboard/${userId}`); 
          }, 1200); 
        })
        .catch((err) =>
          setMessage(err.response?.data?.message || err.message)          
        );
        setTimeout(() => {
          navigate(`/student/dashboard/${userId}`); 
        }, 1200);
    } else {
      setMessage("Invalid email.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white col-9 p-4 mx-auto my-3 rounded"
    >
      <h2 className="mb-3">Schedule Now</h2>
      <div className="mb-3 d-flex border border-secondary rounded shadow-sm">
        <label htmlFor="studentEmail" className="p-2">
        <i className="fa-regular fa-envelope"></i>
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your email"
          id="studentEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          className="form-control border border-secondary"
          placeholder="Enter date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Book
      </button>
      {message && <p className="my-2">{message}</p>}
    </form>
  );
};

export default BookTeacher;
