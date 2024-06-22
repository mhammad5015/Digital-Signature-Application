const nodemailer = require("nodemailer");
const models = require("../models/index");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "obadahesa881@gmail.com",
    pass: "obdb msqv ostb uyzw",
  },
});

exports.sendVerificationEmail = async (req, res, next) => {
  const { recipientEmail } = req.body;

  const code = generateCode();

  const mailOptions = {
    from: "obadahesa881@gmail.com",
    to: recipientEmail,
    subject: "Email Verification",
    text: `We hope this message finds you well. Thank you for registering with D.Signature. To complete your registration, please verify your email address by entering the verification code provided below:

Your Verification Code: ${code}

Please enter this code on the registration page to complete your account setup. If you did not create an account with D.Signature, please disregard this email.

For Your Security:
- Do not share your verification code with anyone.
- If you have any concerns about the security of your account, please contact our support team immediately.

Thank you for choosing D.Signature. We are excited to have you on board!

Best regards,
D.Signature`,
  };

  const sendMail = promisify(transport.sendMail).bind(transport);

  try {
    await sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        console.error("Response:", error.response);
        console.error("Response Code:", error.responseCode);
        console.error("Command:", error.command);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        
        var authorization = req.headers.authorization.split(" ")[1];
        var decoded;
        try {
          decoded = jwt.verify(authorization, secret.secretToken);
        } catch (e) {
          return res.status(401).send("Unauthorized");
        }

        var userId = decoded.id;

        try {
          await models.EmailVerification.create({
            user_id: userId,
            verificationCode: code,
          });
          return res.json({ message: "Email sent successfully" });
        } catch (modelError) {
          console.error("Error saving verification code:", modelError);
          return res
            .status(500)
            .json({ message: "Failed to save verification code" });
        }
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

exports.sendSigningEmail = async (req, res, next) => {
  const { senderEmail, recipientEmail, websiteUrl } = req.body;

  try {
    for (let index = 0; index < recipientEmail.length; index++) {
      const mailOptions = {
        from: senderEmail,
        to: recipientEmail[index],
        subject: "Request Signing",
        text: `Dear ${recipientEmail[index]}, please review and complete the signing process of this document: ${websiteUrl}`,
      };

      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending email:", error);
          console.error("Response:", error.response);
          console.error("Response Code:", error.responseCode);
          console.error("Command:", error.command);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    }
    res.json({
      message: "email sent successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
