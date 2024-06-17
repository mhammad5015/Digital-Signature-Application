const models = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      let userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPass,
      };
      return models.User.create(userData);
    })
    .then((user) => {
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({
        message: "user created successfully",
        data: user,
        token: token,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        const error = new Error("email not found");
        error.statusCode = 401;
        throw error;
      }
      return bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          const error = new Error("Wrong Password");
          error.statusCode = 401;
          throw error;
        }
        let payload = {
          id: user.id,
          email: user.email,
        };
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let token = jwt.sign(payload, jwtSecretKey, { expiresIn: "1h" });
        res.status(200).json({
          message: "logged in successfully",
          data: user,
          token: token,
        });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};