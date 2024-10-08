import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { fetchIdFromEmail } from "../../utils/utils";


const SendMessage = ({userId, userRole}) => {
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [result, setResult] = useState("")
    const { recieverId } = useParams(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const senderId = await fetchIdFromEmail(email);
        if (senderId===userId) {
          axios.post("https://student-teacher-booking-server.onrender.com/api/messages/send", { senderId, recieverId, message, userRole }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
            .then((response) => 
            {setResult("Message sent!" )
            setTimeout(() => {
              navigate(`/${userRole}/dashboard/${userId}`); 
            }, 1200)}
          )
            .catch(error => setResult("Error sending message", error));
        } else {
          setResult("Invalid email.");
        }
      };
  return (
    <form onSubmit={handleSubmit} className="container bg-white col-9 p-4 mx-auto my-3 rounded">
      <h2 className="mb-3">Send Message</h2>
      <div className="mb-3 d-flex border border-secondary rounded shadow-sm">
        <label htmlFor="studentEmail" className="p-2"><i className="fa-regular fa-envelope"></i></label>
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
      <div className="mb-3 border border-secondary rounded">
        <textarea
          type="text"
          placeholder="Enter Message"
          className="form-control"
          cols="50" rows="7"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary" type="submit">Send</button>
      {result && <p className="my-2">{result}</p>}
    </form>
  )
}

export default SendMessage