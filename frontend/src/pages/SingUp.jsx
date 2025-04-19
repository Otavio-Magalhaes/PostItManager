import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import texture from "../assets/texture.jpg";
import signupImage from "../assets/singUp-image.png";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const [singUp, setSingUpError] = useState("");

  async function onSubmit(data) {
    setSingUpError("");
  
    try{
      const response = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
       
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if(!response.ok){
        throw new Error(result.message || "Login failed");
      }

      navigate("/login")

    }catch(error){
      setSingUpError(error.message)
    }
  }

  return (
    <div className="relative flex h-screen bg-[#D4B99D] overflow-hidden">
      {/* Área da imagem com animação */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:block md:w-2/5 lg:w-1/2 h-full bg-cover bg-center z-20"
        style={{ backgroundImage: `url(${signupImage})` }}
      ></motion.div>

      {/* Textura de fundo */}
      <div
        className="absolute inset-0 w-full h-full opacity-12 mix-blend-multiply pointer-events-none z-10"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundRepeat: "repeat",
          backgroundSize: "100% 100%",
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex items-center justify-center w-full md:w-3/5 lg:w-1/2 px-4"
      >
        <div className="bg-[#D4B99D] border border-[#A17D5E] shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-extrabold text-center mb-4 font-nunito">Sign up</h2>
          <p className="text-center text-sm mb-6 text-[#6b6b6b]">
            Create an account to access exclusive features and stay connected.
          </p>
          <button className="flex items-center justify-center w-full bg-white text-black py-2 rounded-lg mb-3 shadow hover:bg-gray-200">
            <FcGoogle className="mr-2" /> Sign up with Google
          </button>
          <button className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-lg mb-4 shadow hover:bg-gray-800">
            <FaFacebook className="mr-2" /> Sign up with Facebok
          </button>
          <div className="flex items-center mb-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-2 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: "First name is required" })}
              className="w-full p-2 mb-2 border rounded bg-[#f5efe0] focus:outline-none focus:ring-2 focus:ring-[#3a3a3a]"
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full p-2 mb-2 border rounded bg-[#f5efe0] focus:outline-none focus:ring-2 focus:ring-[#3a3a3a]"
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 mb-2 border rounded bg-[#f5efe0] focus:outline-none focus:ring-2 focus:ring-[#3a3a3a]"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message: "Password must contain uppercase, lowercase, number, and special character",
                },
              })}
              className="w-full p-2 mb-2 border rounded bg-[#f5efe0] focus:outline-none focus:ring-2 focus:ring-[#3a3a3a]"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            <button
              type="submit"
              className="w-full bg-[#3a3a3a] text-white py-2 rounded-lg hover:bg-[#2a2a2a]"
            >
              Sign up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="./login" className="text-[#3a3a3a] font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
