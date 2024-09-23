import { BACKEND_API_URL } from "@/config"
import axios from "axios"





export const API = axios.create({
  baseURL: BACKEND_API_URL,
});

