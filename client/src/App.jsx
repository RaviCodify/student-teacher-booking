import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import createRouteWrapper from "./utils/appRoute";

// bootstrap cdn for styling and fontawesome cdn for icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Common components
import Navbar from "./Components/common/Navbar";
import Home from "./Components/common/Home";
import Footer from "./Components/common/Footer";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";

// User components
import UserList from "./Components/user/UserList";
import ManageBookings from "./Components/user/ManageBookings";
import TeacherDetail from "./Components/utils/TeacherDetail";
import BookTeacher from "./Components/user/BookTeacher";
import SendMessage from "./Components/message/SendMessage";
import ViewMessage from "./Components/message/ViewMessage";

// Dashboards
import StudentDashboard from "./pages/student/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogin = (role, id) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserId(id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUserId("");
  };

  const { createProtectedRoute, createLoginRoute, createSignupRoute } =
    createRouteWrapper(isLoggedIn, userRole, userId);

  return (
    <Router>
      <div className="user-select-none">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          userRole={userRole}
          userId={userId}
        />
        <div className="container pb-5">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/teachers" element={<UserList userType="teacher" />} />
            <Route path={"/teacher-detail"} element={<TeacherDetail />} />

            {/* Student Routes */}
            {createSignupRoute("/student/signup", Signup)}
            {createLoginRoute("/student/login", Login, handleLogin)}
            {createProtectedRoute(
              `/student/dashboard/${userId}`,
              StudentDashboard
            )}
            {createProtectedRoute("/student/bookings/:teacherId", BookTeacher)}
            {createProtectedRoute("/student/messages", ViewMessage)}
            {createProtectedRoute("/student/messages/:recieverId", SendMessage)}
            {createProtectedRoute("/student/teachers", () => (
              <UserList
                userType="teacher"
                userRole="student"
                isLoggedIn={isLoggedIn}
              />
            ))}

            {/* Teacher Routes */}
            {createSignupRoute("/teacher/signup", Signup)}
            {createLoginRoute("/teacher/login", Login, handleLogin)}
            {createProtectedRoute("/teacher/messages", ViewMessage)}
            {createProtectedRoute("/teacher/messages/:recieverId", SendMessage)}
            {createProtectedRoute(
              `/teacher/dashboard/${userId}`,
              TeacherDashboard
            )}

            {/* Admin Routes */}
            {createSignupRoute("/admin/signup", Signup)}
            {createLoginRoute("/admin/login", Login, handleLogin)}
            {createProtectedRoute("/admin/dashboard/", AdminDashboard)}
            {createProtectedRoute("/admin/book-manage", ManageBookings)}
            {createProtectedRoute("/admin/teachers", () => (
              <UserList
                userType="teacher"
                userRole="admin"
                isLoggedIn={isLoggedIn}
              />
            ))}
            {createProtectedRoute("/admin/students", () => (
              <UserList
                userType="student"
                userRole="admin"
                isLoggedIn={isLoggedIn}
              />
            ))}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
