const models = require("../models/index");
const path = require("path");
const CustomError = require("../util/CustomError");

exports.uploadIdImages = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new CustomError("user is not set", 400);
    }
    let user_image = await models.UserIDImage.create({
      user_id: req.user.id,
      image_frontSide: path.relative(
        "public",
        req.files.image_frontSide[0].path
      ),
      image_backSide: path.relative("public", req.files.image_backSide[0].path),
    });
    res.status(200).json({
      message: "images successfully uploaded",
      data: user_image,
    });
  } catch (err) {
    next(err);
  }
};

exports.uploadDocument = async (req, res, next) => {
  try {
    let doc = await models.Document.create({
      fileName: req.body.fileName,
      file: path.relative("public", req.file.path),
    });
    res.json({
      message: "Document uploaded successfully",
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};
