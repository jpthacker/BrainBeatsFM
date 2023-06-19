import JWT from "jsonwebtoken";
import { Types } from "mongoose";

declare const process: {
  env: {
    JWT_SECRET: string;
  };
};

const secret: string = process.env.JWT_SECRET;

class TokenGenerator {
  static jsonwebtoken(user_id: Types.ObjectId | number) {
    return JWT.sign(
      {
        user_id: user_id,
        iat: Math.floor(Date.now() / 1000),

        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  }
}

export default TokenGenerator;
