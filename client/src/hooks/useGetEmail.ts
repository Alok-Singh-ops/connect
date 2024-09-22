import {jwtDecode} from "jwt-decode";

const useGetEmailFromToken = () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return null; // Handle case when token is not available
  }

  try {
    const decodedToken = jwtDecode<{ email: string }>(token); // Ensure proper typing for the decoded token
    if (!decodedToken || !decodedToken.email) {
      return null; // Handle case where token does not contain email
    }

    return {
      email: decodedToken.email,
      token: token
    };
  } catch (error) {
    console.error("Invalid token", error);
    return null; // Handle error in decoding token
  }
};

export default useGetEmailFromToken;
