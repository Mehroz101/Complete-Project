const { verifyToken } = require("../utils/generateToken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    //console.log("token not found")
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {

    const user = verifyToken(token);
    if (!user) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateToken;
