const jwt = require("jsonwebtoken");
const models = require("../models/index");
const CustomError = require("../util/CustomError");

module.exports = (req, res, next) => {
  try {
    let authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new CustomError(
        "Authorization header is missing. Access is denied.",
        401
      );
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new CustomError("Bearer token is missing. Access is denied.", 401);
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, user) => {
      try {
        if (error) {
          throw new CustomError(
            "Invalid or expired token. Access is forbidden.",
            403
          );
        }
        const isUser = await models.User.findOne({
          where: { id: user.id, firstName: user.firstName },
        });
        if (!isUser) {
          throw new CustomError("Invalid token. Access is forbidden.", 403);
        }
        if(isUser.blocked == 1){
          throw new CustomError("Access is forbidden (blocked).", 403);
        }
        req.user = user;
        next();
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};
