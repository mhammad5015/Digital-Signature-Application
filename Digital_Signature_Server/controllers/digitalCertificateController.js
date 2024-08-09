const models = require("../models/index");
const forge = require("node-forge");
const crypto = require("crypto");
const fs = require("fs");
const RSA = require("./digitalSigningController");
exports.sendPersonalInfo = async (req, res, next) => {
  const { imageFront, imageBack } = req.body;
};

exports.uploadUserData = async (req, res, next) => {
  const { fullName, nationalNumber } = req.body;
  try {
    if (!req.user) {
      throw new CustomError("user is not set", 400);
    }
    let user_image = await models.CertificateOrders.create({
      user_id: req.user.id,
      image_frontSide: path.relative(
        "public",
        req.files.image_frontSide[0].path
      ),
      image_backSide: path.relative("public", req.files.image_backSide[0].path),
      fullName: fullName,
      nationalNumber: nationalNumber,
      reqStatus: "pending",
    });
    return res.status(200).json({
      message: "images successfully uploaded",
      data: user_image,
    });
  } catch (err) {
    next(err);
  }
};

exports.changeOrderStatus = async (req, res, next) => {
  const { status } = req.body;
  try {
    let id = req.user.id;

    const order = await models.CertificateOrders.findOne({ where: { id: id } });
    await order.update({ status: status });
    res.status(200).json({
      message: "order status updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.createDigitalCertificate = async (req, res, next) => {
  try {
    const publicKey = RSA.RSA.publicKey;
    const privateKey = RSA.RSA.privateKey;

    const csr = forge.pki.createCertificationRequest();
    csr.publicKey = publicKey;
    csr.setSubject([
      { name: "commonName", value: "John Doe" },
      { name: "emailAddress", value: "john.doe@example.com" },
    ]);

    csr.addAttribute({
      name: "extensionRequest",
      extensions: [
        {
          name: "subjectAltName",
          altNames: [
            {
              type: 1,
              value: "john.doe@example.com",
            },
          ],
        },
      ],
    });

    csr.sign(privateKey, forge.md.sha256.create());

    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    const csrPem = forge.pki.certificationRequestToPem(csr);

    fs.writeFileSync("user.key", privateKeyPem);
    fs.writeFileSync("user.csr", csrPem);

    console.log("CSR is now ready to be sent to the CA.");
  } catch (err) {
    console.log(err);
  }
  return res
    .json({
      message: "the certificate order was sent to the CA",
    })
    .status(200);
};
