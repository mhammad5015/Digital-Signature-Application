const jwt = require("jsonwebtoken");
const models = require("../models/index");

module.exports = (req, res, next) => {
  let authHeader = req.get("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: "Authorization header is missing. Access is denied." });
  }
  let token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Bearer token is missing. Access is denied." });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, admin) => {
    if (error) {
      return res
        .status(403)
        .json({ error: "Invalid or expired token. Access is forbidden." });
    }
    const isAdmin = await models.Admin.findOne({
      where: { email: admin.email, password: admin.password },
    });
    if (!isAdmin) {
      return res
        .status(403)
        .json({ error: "Invalid token. Access is forbidden." });
    }
    req.admin = admin;
    next();
  });
};
