import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

// delete function for admin for deleting bookings and users
export const handleDelete = (onDeleteCallback) => {
  MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it",
  }).then((result) => {
    if (result.isConfirmed) {
      onDeleteCallback();
      // Perform delete action
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    }
  });
};

// shows 3 user role options when signup/login button is clicked on Navbar
export const handleAuth = (auth, navigate) => {
  MySwal.fire({
    title: capitalize(auth) + " as",
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: "Student",
    cancelButtonText: "Teacher",
    denyButtonText: "Admin",
    cancelButtonColor: "#655CC9",
    denyButtonColor: "#655CC9",
  }).then((result) => {
    const role = result.isDenied
      ? "admin"
      : result.isConfirmed
      ? "student"
      : result.dismiss === Swal.DismissReason.cancel
      ? "teacher"
      : null;

    if (role) {
      navigate(`/${role}/${auth}`);
    }
  });
};

// extract user Id from an email
export const fetchIdFromEmail = async (email) => {
  try {
    const response = await axios.get("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    
    const user = response.data.find((user) => user.email === email);
    return user ? user._id : null;
  } catch (error) {
    console.error("There was an error fetching the data!", error);
    return null;
  }
};

// extract bookings (approved & other)
export const fetchBookings = async (userId, userRole) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/bookings/${userId}`,
      {
        params: { userRole },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const filteredBooking = response.data.filter(
      (booking) => booking.student !== null && booking.teacher !== null
    );
    const approvedBooking = filteredBooking.filter(
      (booking) => booking.status === "Approved"
    );
    const otherBooking = filteredBooking.filter(
      (booking) => booking.status !== "Approved"
    );
    return {
      approvedBooking,
      otherBooking: userRole === "student" ? otherBooking : [],
    };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// selected word is changed to proper case
export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
