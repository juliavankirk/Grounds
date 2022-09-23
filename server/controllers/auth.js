const router = require("express").Router();
const User = require("../models/UserModel");
const dotenv = require('dotenv');
dotenv.config();
const CryptoJS = require("crypto-js"); // Encryption library
const jwt = require("jsonwebtoken"); // Library that generates token for each user, for more security

//REGISTER
router.post("/register", async (req, res) => {

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
  });

  try {
    // Waits for newUser promise before logging
    const savedUser = await newUser.save();
    // Save to client side / 201 means successfully edited
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne( // Find user withing db
            {
                userName: req.body.user_name
            }
        );

        if (!user) return res.status(401).json("Incorrrect username!");

        const hashedPassword = CryptoJS.AES.decrypt( // Decrypt password
            user.password, 
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // Parameter used for special characters
        const inputPassword = req.body.password;
        
        if (originalPassword != inputPassword) {
          return res.status(401).json("Incorrect password!");
        }

        const accessToken = jwt.sign( // Once information checks
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        // Access token expires every three days
            { expiresIn:"3d" }
        );
  
        const { password, ...others } = user._doc; // Pass in mongoDB document
        return res.status(200).json({...others, accessToken}); // Hides password from being shown

    } catch(err) {
        return res.status(500).json(err);
    }

});

module.exports = router;