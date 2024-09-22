import { BACKEND_API_URL } from "@/config"
import axios from "axios"


const token = localStorage.getItem("token")



export const API = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    authorization: `Bearer ${token}`,
  }
});

