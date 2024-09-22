import express from "express";
import cors from "cors";
import { connectDB } from "./lib/db";
import UserRouter from "./routes/UserRoutes";
import PostRouter from "./routes/PostRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

// Apply necessary middlewares
app.use(cors()); // Apply CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


const startServer = async () => {
  try {
    // Establish DB connection
    await connectDB();
    console.log("Successfully connected to db");

    app.use("/user", UserRouter);
    app.use("/post",PostRouter)


    app.get("/health",(req,res)=>{
      res.status(200).json({
        message: "System is up"
      })
    })

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started -> ${PORT}`);
    });
  } catch (err) {
    console.error("Something went wrong while starting the server:", err);
    process.exit(1); // Exit on failure
  }
};

startServer();
