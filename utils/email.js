const nodemailer = require("nodemailer");
const path = require('path')
var hbs = require('nodemailer-express-handlebars');




const sendEmail = async (email, subject,message, template) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: "coyotte56000@gmail.com",
        pass: process.env.PASS,
      },
    });
    
    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('../views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views'),
      extName: ".handlebars",
    }
    
    transporter.use('compile', hbs(handlebarOptions));

    var mailOptions = {
      from: 'youremail@gmail.com',
      to: email,
      subject: subject,
      template: template,
      context: {
        title: 'Title Here',
        text: message
      }
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
