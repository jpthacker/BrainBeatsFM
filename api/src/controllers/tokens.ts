import User from "../models/user";
import TokenGenerator from "../models/token_generator";
import { Request, Response } from "express";

const SessionsController = {
  Create: (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        console.log("auth error: user not found");
        res.status(401).json({ message: "auth error" });
      } else if (user.password !== password) {
        console.log("auth error: passwords do not match");
        res.status(401).json({ message: "auth error" });
      } else {
        const token = TokenGenerator.jsonwebtoken(user._id);
        res.status(201).json({
          userID: user._id,
          image: user.image,
          username: user.name,
          password: user.password,
          token: token,
          message: "OK",
        });
      }
    });
  },
};

export default SessionsController;
