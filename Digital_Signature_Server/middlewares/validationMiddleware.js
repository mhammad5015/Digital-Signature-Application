const { validationResult, check } = require("express-validator");
const models = require("../models/index");

const registerValidation = [
  check("firstName", "First name is required").trim().notEmpty(),
  check("lastName", "Last name is required").trim().notEmpty(),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((value) => {
      return models.User.findOne({ where: { email: value } }).then(
        (userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "email already exists, please pick a different one"
            );
          }
        }
      );
    }),
  check("password", "password is required")
    .trim()
    .notEmpty()
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters"),
  check("confirm password", "confirm password is required")
    .trim()
    .notEmpty()
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must be same");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
];

const loginValidation = [
  check("email", "Email Address Is Required")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password", "Password Required")
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    next();
  },
];

module.exports = { registerValidation, loginValidation };
