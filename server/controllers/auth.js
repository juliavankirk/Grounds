const router = require("express").Router();
const User = require("../models/UserModel");
const dotenv = require('dotenv');
dotenv.config();
const CryptoJS = require("crypto-js"); // Encryption library
const jwt = require("jsonwebtoken"); // Library that generates token for each user, for more security

//REGISTER
router.post("/register", async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    return res.status(409).json({ message: 'The email has been already registered' })
  } else {
    // Save newUser to db as a promise
    const newUser = new User({
      username: req.body.username,
      forename: req.body.forename,
      surname: req.body.surname,
      email: req.body.email,
      // CryptoJS library to encrypt password
      password: CryptoJS.AES.encrypt(
        req.body.password, // Message
        process.env.PASS_SEC // Secret passphrase
      ).toString(),
    })
    try {
      // Waits for newUser promise before logging
      const savedUser = await newUser.save()
      // Save to client side / 201 means successfully edited
      return res.status(201).json(savedUser);
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
})

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // Find user withing db

    if (user) {
      const hashedPassword = CryptoJS.AES.decrypt( // Decrypt password
        user.password,
        process.env.PASS_SEC);

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // Parameter used for special characters
      const inputPassword = req.body.password;

      if (originalPassword == inputPassword) {
        const accessToken = jwt.sign( // Once information checks
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          //Access token expires every three days    
          { expiresIn: "3d" }
        );
        const { password, ...others } = user._doc; // Pass in mongoDB document
        return res.status(200).json({ ...others, accessToken }); // Hides password from being shown
      } else {
        return res.status(401).json({ message: 'Wrong password' })
      }
    } else {
      return res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    console.log('Promise rejected')
    return res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = router;