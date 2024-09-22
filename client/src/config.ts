const MODE = import.meta.env.MODE

export const BACKEND_API_URL = MODE === "PRODUCTION" ? "https://connect-np7e.onrender.com": "https://connect-np7e.onrender.com"