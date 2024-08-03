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
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // CHECK IF ADMIN
    const { email, password } = req.body;
    const admin = await models.Admin.findOne({ where: { email: email } });
    if (admin) {
      // return res.status(400).json({ message: "Admin not found" });
      const isEqual = await bcrypt.compare(password, admin.password);
      if (!isEqual) {
        return res.status(400).json({ message: "Wrong password" });
      }
      const payload = {
        id: admin.id,
        firstName: admin.firstName,
      };
      let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "logged in successfully",
        data: admin,
        token: token,
      });
    }
    // CHECK IF USER
    let user = await models.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    let isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(400).json({ message: "wrong password" });
    }
    let payload = {
      id: user.id,
      firstName: user.firstName,
    };
    let token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    let resData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      organization: user.organization,
      email: user.email,
      password: user.password,
      role: "user",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return res.status(200).json({
      message: "User logged in successfully",
      data: resData,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
