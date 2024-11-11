const nodemailer = require("nodemailer");

const sendEmail = async (email, message, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "eliezer17@ethereal.email",
        pass: "15dQ6Qg98V6518U8Zj",
      },
    });

    const mailOptions = {
      from: "eliezer17@ethereal.email",
      to: "arifjahan.cse@gmail.com",
      subject: "New Message from Sijuk",
      text: `Email: ${email}\nMessage: ${message}`,
      html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>New Message from Your Website</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f5f5f5;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                  text-align: center;
                }
                p {
                  color: #666;
                  line-height: 1.5;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>New Message from Sijuk</h1>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>
              </div>
            </body>
          </html>
        `,
    };

    const emailSend = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", emailSend);
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmail;
