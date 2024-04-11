const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "this time ok", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = decodedToken.id;
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;

        // Continue to the next middleware or route handler
        next();
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      });
  });
};

module.exports = verifyToken;
