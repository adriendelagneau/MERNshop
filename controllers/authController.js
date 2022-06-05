const { UserModel } = require('../models/UserModel');
const { TokenModel } = require("../models/TokenModel");
const { registerErrors, loginErrors } = require('../utils/errorsUtils');
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const bcrypt = require('bcrypt')

// Register
module.exports.signUp = async (req, res) => {

  const password = req.body.password
  const salt = await bcrypt.genSalt();
  const encryptPassword = await bcrypt.hash(password, salt);

  try {
    let user = await new UserModel({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: encryptPassword
    }).save();

    let token = await new TokenModel({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const template = "verifyEmailRegister"
    const message = `${process.env.BASE_URL}/auth/verify/${user.id}/${token.token}`;
    await sendEmail(user.email, "Verify Email", message, template);////////////////////////////////////////////

    res.send("An Email sent to your account please verify");

  } catch (err) {
    const errors = registerErrors(err)
    res.status(400).json({
      message: {
        register: errors
      }
    });
  }
}

// VERIFY EMAIL (REGISTER)
module.exports.verify = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.id
    });
    if (!user) return res.status(400).send("Invalid link");

    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await UserModel.updateOne({
      _id: user._id
    }, {
      $set: {
        verified: true
      }
    });

    await TokenModel.findByIdAndRemove(token._id);
    //res.send("email verified sucessfully let's connect");
    res.redirect('http://localhost:3000/login')
  } catch (err) {
    res.status(400).send(err);
  }
}

// LOGIN
module.exports.signIn = async (req, res) => {

  try {
    const user = await UserModel.findOne({
      email: req.body.email
    });
    if (!user)
      return res.status(401).send({
        message: {
          login: "Email incorrect"
        }
      });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({
        message: {
          login: "Mot de passe incorrect"
        }
      });

    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY, {
        expiresIn: "3d"
      }
    );
    const { ...others } = user._doc;

    res.cookie('jwt', accessToken);

    res.status(200).json({
      ...others,
      accessToken
    });
  } catch (error) {
    res.status(500).send({
      message: {
        server: "Internal Server Error"
      }
    });
  }
}

// LOGOUT
module.exports.logout = (req, res) => {

  res.cookie('jwt', '', {
    maxAge: 1
  });
  res.status(200).send(null);
}

// VERIFY IF EMAIL EXIST IN BDD
module.exports.isEmailExist = async (req, res) => {
  console.log(req.body)

  try {
    const user = await UserModel.findOne({
      email: req.body.email
    });
    if (!user) return res.status(200).send(false);
    res.status(200).send(true);

  } catch (err) {
    res.status(400).send(false);
  }
}

// FORGOT PASSWORD LINK (USER NOT CONNECTED)

module.exports.passworReset = async (req, res) => {
  const email = req.body
  const template = "email"

  try {
    const user = await UserModel.findOne(email);

    if (user) {
      try {

        let token = await new TokenModel({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const message = `${process.env.BASE_URL}/auth/changePwd/${user.id}/${token.token}`;
        await sendEmail(user.email, "Change pwd", message, template);

        res.send("An Email sent to your account please verify");
      } catch (err) {
        console.log(err)
      }

    } else {

      const err = {
        message: "email"
      }
      const errors = loginErrors(err)////////////
      res.status(200).json({
        errors
      });
    }
  } catch (err) {

    const errors = loginErrors(err)///////////
    res.status(200).json({
      errors
    });
  }
}

module.exports.verifyPwd = async (req, res) => {
  
  try {
    const user = await UserModel.findOne({
      _id: req.params.id
    });
    if (!user) return res.status(400).send("Invalid link");
    
    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");
    
    //await TokenModel.findByIdAndRemove(token._id);
    res.redirect('http://localhost:3000/password');
    
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports.newPwd = async (req, res) => {
  
  const user = await UserModel.findOne({
    email: req.body.email
  });
  const token = await TokenModel.findOne({
    userId: user._id
  })

  const newPassword = req.body.password
  const salt = await bcrypt.genSalt();
  const toto = await bcrypt.hash(newPassword, salt);


  //if(((result.(user._id)).equals(token.userid))) {} else {}
  try {
    if (token) {
      await UserModel.updateOne({
        _id: user
      }, {
        $set: {
          password: toto
        }
      });
      await TokenModel.findByIdAndRemove(token._id);
      res.status(200).send("password changed")
    } else console.log("on a un petit malin...")
  } catch (err) {
    console.log(err)
  }
}
// CHANGE PASSWORD LINK (USER CONNECTED)

module.exports.newPwdUser = async (req, res) => {

  const user = await UserModel.findOne({
    email: req.body.email
  });


  const newPassword = req.body.password
  const salt = await bcrypt.genSalt();
  const toto = await bcrypt.hash(newPassword, salt);


  //if(((result.(user._id)).equals(token.userid))) {} else {}
  try {

    await UserModel.updateOne({
      _id: user
    }, {
      $set: {
        password: toto
      }
    });

    res.status(200).send("password changed")

  } catch (err) {
    console.log(err)
  }
}