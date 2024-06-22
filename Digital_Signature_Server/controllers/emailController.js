const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false,
  auth: {
    user: '1a2b3c4d5e6f7g',
    pass: '1a2b3c4d5e6f7g',
  },
});

exports.sendVerificationEmail = function (recipientEmail, verificationCode) {
  const mailOptions = {
    from: "sameeqqq2019@gmail.com",
    to: recipientEmail,
    subject: "Email Verification",
    text: `We hope this message finds you well. Thank you for registering with D.Signature. To complete your registration, please verify your email address by entering the verification code provided below:

    
Your Verification Code: ${verificationCode}

Please enter this code on the registration page to complete your account setup. If you did not create an account with D.Signature, please disregard this email.

For Your Security:
- Do not share your verification code with anyone.
- If you have any concerns about the security of your account, please contact our support team immediately.

Thank you for choosing D.Signature. We are excited to have you on board!

Best regards,
D.Signature`,
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
};

exports.sendSigningEmail = function (senderEmail, recipientEmail, websiteUrl) {
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
};
