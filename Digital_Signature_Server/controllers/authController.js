const models = require("../models/index");
const bcrypt = require("bcryptjs");
const { log } = require("console");
const jwt = require("jsonwebtoken");
const path = require("path");

exports.userRegister = async (req, res, next) => {
  const { firstName, middleName, lastName, organization, email, password } =
    req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 12);
    let userData = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      organization: organization,
      email: email,
      password: hashedPass,
    };
    const user = await models.User.create(userData);
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
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;
  models.User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: "user not found" });
      }
      return bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          res.status(400).json({ message: "wrong password" });
        }
        let payload = {
          id: user.id,
          email: user.email,
          password: user.password,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        res.status(200).json({
          message: "User logged in successfully",
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

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await models.Admin.findOne({ where: { email: email } });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const isEqual = await bcrypt.compare(password, admin.password);
    if (!isEqual) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      password: admin.password,
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Admin logged in successfully",
      data: admin,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
