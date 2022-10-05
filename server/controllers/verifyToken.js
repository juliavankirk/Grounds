const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => { // Middleware
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // to allow a space between token and bearer
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) 
      return res.status(403).json("Token is invalid!");
      // Assign requested user to user
      req.user = user;
      // Leave this function to continue running parent function
      next();
    });
  } else {
    console.log(token);
    return res.status(401).json("You are not authenticated!");
    
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};