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
    return res.status(200).json({
      message: "images successfully uploaded",
      data: user_image,
    });
  } catch (err) {
    next(err);
  }
};

exports.uploadDocument = async (req, res, next) => {
  try {
    const user = await models.User.findOne({ where: { id: req.user.id } });
    let doc = await models.Document.create({
      documentName: req.body.documentName,
      document: path.relative("public", req.file.path),
      documentStatus: "processing",
    });
    await user.addDocument(doc, { through: { isSigned: false } });
    return res.json({
      message: "Document uploaded successfully",
      data: doc,
    });
  } catch (err) {
    next(err);
  }
};

// via token
exports.getUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await models.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(200).json({
        message: "there is no user with this id",
        data: user,
      });
    } else {
      return res.status(200).json({
        message: "Success",
        data: user,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserDocuments = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await models.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(200).json({
        message: "there is no user with this id",
        data: user,
      });
    } else {
      const userData = await models.User.findOne({
        where: { id: user.id },
        include: models.Document,
      });
      if (userData.Documents.length === 0) {
        return res.status(200).json({
          message: "there is no documents to show",
          data: userData.Documents,
        });
      }
      return res.status(200).json({
        message: "Success",
        data: userData.Documents,
      });
    }
  } catch (err) {
    next(err);
  }
};

// for whom?
exports.deleteDocument = (req, res, next) => {};
