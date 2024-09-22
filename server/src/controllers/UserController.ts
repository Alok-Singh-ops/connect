import { z } from "zod";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { handleError } from "../errors/errors";
import { NoUserError, PasswordNotMatchedError } from "../errors/userError";
import jwt from "jsonwebtoken";
import { prismaClient } from "../lib/prismaClient";
import { envVariables } from "../config/envConfig";
import { s3Client } from "../lib/s3Bucket";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getUserByEmail } from "../lib/utils";

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

class UserController {
 



  public async createUser(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      await UserSchema.parseAsync({ email, password });
      
      const hashedPassword = await bcrypt.hash(password, 8);
      await prismaClient.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({
        message: "User created successfully",
      });
    } catch (err) {
      return handleError(err, res);
    }
  }

  public async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      await UserSchema.parseAsync({ email, password });

      const user = await getUserByEmail(email);
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new PasswordNotMatchedError("Invalid password, please try again");
      }

      const token = jwt.sign({ email }, envVariables.JWT_SECRET || "", {
        expiresIn: "1h",
      });

      return res.status(200).json({
        token,
        message: "Logged in successfully",
      });
    } catch (err) {
      return handleError(err, res);
    }
  }



 
  

}

export default UserController;
