import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3"
import { envVariables } from "../config/envConfig"




export const s3Client = new S3Client({
  region: envVariables.AWS_REGION,
  credentials: {
    accessKeyId: envVariables.S3_BUCKET_ACCESS_KEY_ID || "",
    secretAccessKey: envVariables.S3_BUCKET_SECRET_ACCESS_KEY || ""
  }
})