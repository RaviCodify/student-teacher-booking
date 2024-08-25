# Student-Teacher-Booking

A MERN stack application for managing student-teacher appointments. This web application allows students to book appointments with teachers, and teachers and administrators to manage and oversee these bookings.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
  
## Features

- **Student Functionality**:
  - Register and log in.
  - View available teachers.
  - Book appointments with teachers.
  - Send and recieve messages from teachers.

- **Teacher Functionality**:
  - Register and log in.
  - View and manage appointments.
  - Send and recieve message from students.

- **Admin Functionality**:
  - Manage teacher and student accounts.
  - Oversee all appointments.

## Tech Stack

- **Frontend**:
  - React
  - Bootstrap (for styling)
  - Vite (for development and build)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)

- **Authentication**:
  - JSON Web Tokens (JWT)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB (local or cloud)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/student-teacher-booking.git
   cd student-teacher-booking

2. **Navigate to the client directory and install dependencies:**

    cd client
    npm install

3. **Navigate to the server directory and install dependencies:**

    cd ../server
    npm install

4. **Setup environment variables:**
    Create a .env file in the server directory with the following variables:

    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

5. **Run the application:**
    *Start the server*
    npm start

    *Navigate to the client directory and start the client:*
    cd ../client
    npm start

The application will be accessible at "http://localhost:5173" for the client and "http://localhost:5000" for the server.


## Usage
1. Register as a student or teacher.
2. Log in using your credentials.
3. Students can browse available teachers and book appointments.
4. Teachers can manage their availability and view appointments.
5. Admins can oversee the entire system and manage user accounts.

## API Endpoints

### Authentication

- **Register a New User**
  - `POST /api/signup`
- **Log In**
  - `POST /api/login`

### Bookings

- **Create a Booking**
  - `POST /api/bookings/book` - Authenticated users only
- **Get All Bookings**
  - `GET /api/bookings/all` - Authenticated users only (Admin)
- **Update Booking Status**
  - `PATCH /api/bookings/update/:id` - Authenticated users only (Admin)
- **Delete a Booking**
  - `DELETE /api/bookings/delete/:id` - Authenticated users only (Admin)
- **Get Booking by ID**
  - `GET /api/bookings/:id` - Authenticated users only

### Messages

- **Create a Message**
  - `POST /api/messages/send` - Authenticated users only
- **Fetch Messages**
  - `GET /api/messages/:id` - Authenticated users only

### Users

- **Fetch Teacher List (Public)**
  - `GET /api/public/teachers`
- **Fetch Users**
  - `GET /api/user` - Authenticated users only
  - `GET /api/user/:id` - Authenticated users only
- **Delete a User**
  - `DELETE /api/user/:id` - Authenticated users only


## Folder Strcture

```plaintext
student-teacher-booking/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/                    # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
└── README.md
```

## Contributing

Feel free to fork the repository and submit pull requests. For significant changes, please open an issue to discuss your proposed changes first.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
Feel free to copy and paste this content into your `README.md` file and adjust any specifics as needed.
