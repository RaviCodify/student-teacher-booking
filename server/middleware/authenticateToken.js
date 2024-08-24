const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
    
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }
  
  const token = authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ err});
    }
    
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
