const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        res.status(201).json({ message: "OK" });
      })
      .catch((err) => {
        res.status(400).json({ message: "Bad request" });
      });
  },
  Index: async (req, res) => {
    const userID = req.params.userID;
    try {
      const user = await User.findById(userID).exec();
      const token = TokenGenerator.jsonwebtoken(user._id);
      res.status(200).json({ user: user, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  All: async (req, res) => {
    try {
      const users = await User.find().exec();
      res.status(200).json({ users: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  Update: async (req, res) => {
    const username = req.params.username;
    try {
      console.log(req);
      const user = await User.findOneAndUpdate(
        { name: username },
        {
          name: req.body.name,
          password: req.body.password,
          image: req.body.image,
        },
        { new: true }
      ).exec();
      res.status(200).json({ user: user, req: req.body });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = UsersController;
