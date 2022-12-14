const CryptoJS = require("crypto-js"); 
const User = require("../models/User");
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => { // Middleware
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  } else {
    return res.status(401).json({ message: 'Wrong password' })
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // Sets requested body into user
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log('Promise rejected')
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
    // filters users by query sorted by id, showing 5 at a time
      ? await User.find().sort({ _id: -1 }).limit(5)
      // otherwise show all users
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      // Searches users created in the past year
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          // Assign month from created at value to month
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          // Group query by month
          _id: "$month",
          total: { $sum: 1 }, // Tallies every registered user
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id/carts", verifyToken, async (req, res) => {
  const user = await User.findById(req.params.id);
  const { password, ...others } = user._doc;

  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:userId/carts/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...others } = user._doc;
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json("Cart has been updated...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:userId/carts/:id", verifyToken, async (req, res) => {
  
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...others } = user._doc;
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/carts/:userId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;