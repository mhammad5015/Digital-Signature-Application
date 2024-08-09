const models = require("../models/index");
const CustomError = require("../util/CustomError");

exports.getAllUsers = async (req, res, next) => {
  try {
    const userData = await models.User.findAll();
    if (userData.length > 0) {
      res.status(200).json({ message: "Success", data: userData });
    } else {
      res.status(200).json({ message: "There Is No Users", data: userData });
    }
  } catch (err) {
    next(err);
  }
};
