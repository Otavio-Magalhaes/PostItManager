import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import {FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import texture from "../assets/texture.jpg";
import loginImage from "../assets/login-image.png";
import { useAuth } from "../../context/AuthContext";
import {motion} from "framer-motion"
export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");

  async function onSubmit(data) {
    setLoginError(""); // Resetando erro anterior

    try {
      const response = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
   
      setUser(result);
      console.log("Logado Com sucesso")
      console.log(result)

      navigate("/board");
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
    <div className="relative flex h-screen bg-[#D4B99D] overflow-hidden">
      {/* Textura de fundo */}
      <div
        className="absolute inset-0 w-full h-full opacity-12 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundRepeat: "repeat",
          backgroundSize: "100% 100%",
        }}
      ></div>

      {/* Área do formulário */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex items-center justify-center w-full md:w-3/5 lg:w-1/2 px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-[#D4B99D] border border-[#A17D5E] shadow-lg rounded-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-extrabold text-center mb-4 font-nunito">Sign in</h2>
          <p className="text-center text-sm mb-6 text-[#6b6b6b]">
            Log in to unlock tailored content and stay connected with your community.
          </p>
          <a href="http://localhost:3000/api/auth/google" >
            <button  className="flex cursor-pointer items-center justify-center w-full bg-white text-black py-2 rounded-lg mb-3 shadow hover:bg-gray-200">
              <FcGoogle className="mr-2" /> Sign in with Google
            </button>
          </a>
          <button className="flex cursor-pointer items-center justify-center w-full bg-blue-600 text-white py-2 rounded-lg mb-4 shadow hover:bg-gray-800">
            <FaFacebook className="mr-2" /> Sign in with Facebook
          </button>
          <div className="flex items-center mb-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-2 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          {/* Exibir erro de login, se houver */}
          {loginError && <p className="text-red-500 text-xs text-center mb-2">{loginError}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
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
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
                  message: "Password must contain uppercase, lowercase, and special character",
                },
              })}
              className="w-full p-2 mb-2 border rounded bg-[#f5efe0] focus:outline-none focus:ring-2 focus:ring-[#3a3a3a]"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm hover:cursor-pointer">
                <input type="checkbox" className="mr-2 " /> Keep me signed in
              </label>
              <a href="#" className="text-sm text-[#6b6b6b] hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-[#7f833a] text-white py-2 rounded-lg hover:bg-[#747652]"
            >
              Sign in
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <a href="./SingUp" className="text-[#3a3a3a] font-semibold hover:underline hover:cursor-pointer">
              Sign up
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Área da imagem com animação */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block md:w-2/5 lg:w-1/2 h-full bg-cover bg-center z-20"
        style={{ backgroundImage: `url(${loginImage})` }}
      ></motion.div>
    </div>
  );
}
