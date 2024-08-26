import React, { useState, useEffect } from "react";
import axios from "axios";

const Message = ({ userId, userRole }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://student-teacher-booking-server.onrender.com/api/messages/${userId}`,
          {
            params: { userRole },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const filteredData = response.data.filter(
          (message) =>
            message.sender !== userRole &&
            message.student !== null &&
            message.teacher !== null
        );
        setMessages(filteredData.length > 0 ? filteredData : []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [userRole, userId]);

  return (
    <div className="container text-white mb-5">
      <h2 className="mt-3">Messages</h2>
      <div className="row">
        {messages.length !== 0 ? (
          messages.map((message) => (
            <div className="col-md-6 my-3" key={message._id}>
              <div className="card border-secondary">
                <div className="card-body">
                  <h5 className="card-title">Message: {message?.message}</h5>
                  <p className="card-text">
                    From{" "}
                    {userRole === "teacher"
                      ? message?.student?.name
                      : message?.teacher?.name}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No messages found</p>
        )}
      </div>
    </div>
  );
};

export default Message;
