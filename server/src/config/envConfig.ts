import dotenv from "dotenv"

dotenv.config();

export const envVariables = {
  JWT_SECRET: process.env.JWT_SECRET,
  S3_BUCKET_ACCESS_KEY_ID: process.env.S3_BUCKET_ACCESS_KEY_ID,
  S3_BUCKET_SECRET_ACCESS_KEY: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION
} 