import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prismaClient } from "../lib/prismaClient";
export const userMiddlewares = async (req:Request,res:Response,next: NextFunction)=>{
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Please provide valid token.",
    });
  }

 
  const decodedToken = jwt.decode(token) as { email: string };
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: decodedToken.email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "No user exist.",
      });
    }
  } catch (err) {
    console.log(err);
  }

  //@ts-ignore
  req.token = token; // Attach token to the req object
  next();
}