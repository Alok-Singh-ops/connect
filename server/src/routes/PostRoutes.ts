import {Router} from "express"
import multer from "multer";
import { userMiddlewares } from "../middlewares/userMiddlewares";
import PostController from "../controllers/PostContoller";

const postRouter = Router();

const postController = new PostController()


const storage = multer.memoryStorage();
const upload = multer({storage})
postRouter.post("/create",upload.single('file'),userMiddlewares,(req,res)=>{
  postController.createPost(req,res) 
})


postRouter.post("/getPosts",userMiddlewares,(req,res)=>{
  postController.getPost(req,res) 
})

postRouter.post("/like",userMiddlewares,(req,res)=>{
  postController.likePost(req,res) 
})

postRouter.post("/dislike",userMiddlewares,(req,res)=>{
  postController.dislikePost(req,res) 
})





export default postRouter
