const User = require("../models/users");
const TokenGenerator = require("../models/token_generator");

const UsersController = {
  Create: (req, res) => {
    console.log("hello");
    const user = new User(req.body);
    user.save().then((err) => {
      if (err) {
        res.status(201).json({ message: "OK" });
      } else {
        res.status(400).json({ message: "Bad Request" });
      }
    });
  },
  Index: (req, res) => {
    const userID = req.params.userID;
    User.findById(userID, async (err, user) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(user._id);
      res.status(200).json({ user: user, token: token });
    });
  },
};

module.exports = UsersController;
