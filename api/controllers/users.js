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
  Index: (req, res) => {
    const userID = req.params.userID;
    User.findById(userID, async (err, user) => {
      if (err) {
        throw err;
      }
      console.log("test", user)
      const token = TokenGenerator.jsonwebtoken(user._id);
      res.status(200).json({ user: user, cheese: "cheese", token: token });
    });
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
};

module.exports = UsersController;
