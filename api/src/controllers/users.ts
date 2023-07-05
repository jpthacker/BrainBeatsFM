import User from "../models/user";
import TokenGenerator from "../models/token_generator";
import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";

const UsersController = {
  Create: (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
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
  Index: async (req: Request, res: Response) => {
    const userID = req.params.userID;
    try {
      const user = await User.findById(userID).exec();
      let token;
      if (user) {
        token = TokenGenerator.jsonwebtoken(user._id);
      }
      res.status(200).json({ user: user, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  All: async (req: Request, res: Response) => {
    try {
      const users = await User.find().exec();
      res.status(200).json({ users: users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
  Update: async (req: Request, res: Response) => {
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

export default UsersController;
