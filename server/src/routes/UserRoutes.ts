import {  Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import multer from "multer"
import { userMiddlewares } from "../middlewares/userMiddlewares";
const UserRouter = Router();
const userController = new UserController()


UserRouter.post("/signIn",(req:Request,res:Response)=>{
  userController.signIn(req,res);
})

UserRouter.post("/register",(req:Request,res:Response)=>{
  userController.createUser(req,res);
})







export default UserRouter