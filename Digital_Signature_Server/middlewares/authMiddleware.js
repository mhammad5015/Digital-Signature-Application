const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let authHeader = req.get("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Authorization header is missing. Access is denied." });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Bearer token is missing. Access is denied." });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) {
      return res
        .status(403)
        .json({ error: "Invalid or expired token. Access is forbidden." });
    }
    req.user = user;
    next();
  });
};
