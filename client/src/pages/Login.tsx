import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      navigate("/")
    }
  }, [navigate])
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async() => {
      try {
          const data = await axios.post("https://connect-np7e.onrender.com/user/signIn",formData)
          localStorage.setItem("token",data.data.token)
          navigate("/")
      } catch (error) {
        console.log(error);
      }
  };



  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        autoComplete="off"
        onChange={handleChange}
        name="email"
        value={formData.email}
        type="text"
        placeholder="Email"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        onChange={handleChange}
        name="password"
        value={formData.password}
        type="password"
        placeholder="Password"
        className="p-2 border border-gray-300 rounded-md"
      />
       <div>

        <Link to="/register">Don't have an account? Register</Link>
    </div>
      <Button onClick={handleSubmit}>Login</Button>

    </div>
  );
};

export default Login;
