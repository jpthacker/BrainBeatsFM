const User = require("../models/user");

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
};

module.exports = UsersController;
