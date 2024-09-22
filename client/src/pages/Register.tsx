import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
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
          const data = await axios.post("http://localhost:8080/user/register",formData)
          console.log(data);
      } catch (error) {
        console.log(error);
      }
  };



  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-2xl font-bold">Register</h1>
      <input
        autoComplete="off"
        onChange={handleChange}
        name="firstName"
        value={formData.firstName}
        type="text"
        placeholder="First Name"
        className="p-2 border border-gray-300 rounded-md"
      />
      <input
        autoComplete="off"
        onChange={handleChange}
        name="lastName"
        value={formData.lastName}
        type="text"
        placeholder="Last Name"
        className="p-2 border border-gray-300 rounded-md"
      />
      
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
      <Button
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {
          isSubmitting ? "Submitting..." : "Register"
        }
      </Button>
    </div>
  );
};

export default Register;
