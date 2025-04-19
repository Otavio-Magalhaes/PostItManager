import React, { useState } from "react";
import { FaRegEnvelope, FaRegUser, FaCog, FaBars, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiLayer, BiFolder, BiDotsHorizontalRounded } from "react-icons/bi";
import { PiUsers } from "react-icons/pi";
import texture from "../assets/texture.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  async function handleLogout(){
    try{
      await fetch("http://localhost:3000/api/auth/logout",{
        method: "GET",
        headers:{
          "Content-Type": "application/json"
        },
        credentials: "include",
      }),
      navigate("/login")

    }catch(err){
      console.error("Erro ao deslogar:", err);
    }
  }

  return (
    <>
      <button
        className="fixed top-4 left-4 md:hidden bg-[#7f833a] p-2 rounded text-white z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="text-xl" />
      </button>

      <div
        className={`fixed md:relative h-screen w-64 bg-[#D4B99D] border-r border-[#A17D5E] shadow-lg flex flex-col 
        transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div
          className="absolute inset-0 w-full h-full opacity-12 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100% 100%",
          }}
        ></div>

        <div className="relative z-10 p-4 flex flex-col items-center">
          <div className="flex items-center space-x-3">
            <FaRegUser className="text-2xl text-[#3a3a3a]" />
            <h1 className="text-lg font-semibold text-[#3a3a3a]">{ user?.name || "Carregando..."}</h1>
          </div>
          <button className="mt-4 w-full bg-[#7f833a] text-white py-2 rounded-lg hover:bg-[#747652] flex items-center justify-center space-x-2">
            <span>+ Criar Quadro</span>
          </button>
        </div>

        <nav className="relative z-10 flex-1 mt-4 px-4">
          <ul className="space-y-2 text-[#3a3a3a]">
            <li className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer">
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </li>
            <li 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer"
              onClick={() => navigate('/boards')}
            >
              <BiLayer className="text-xl" />
              <span>Quadros</span>
            </li>
            <li 
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer"
              onClick={() => navigate('/projects')}
            >
              
              <BiFolder className="text-xl" />
              <span>Projetos</span>
            </li>
          </ul>

          <p className="mt-6 px-3 text-sm text-[#6b6b6b]">Documentos</p>
          <ul className="space-y-2 text-[#3a3a3a] px-4 mt-2">
            <li className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer">
              <FaRegEnvelope className="text-xl" />
              <span>E-mails</span>
            </li>
            <li className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer">
              <BiDotsHorizontalRounded className="text-xl" />
              <span>Mais...</span>
            </li>
          </ul>
        </nav>

        <div className="relative z-10 p-4 border-t border-[#A17D5E]">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer">
            <FaCog className="text-xl" />
            <span>Configurações</span>
          </div>

          <div
          onClick={handleLogout}
          className="mt-4 flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer"
        >
          <FaSignOutAlt className="text-2xl text-[#3a3a3a]" />
          <span>Logout</span>
        </div>

          <div className="mt-4 flex items-center space-x-3 px-3 py-2 rounded-lg">
            <FaRegUser className="text-2xl text-[#3a3a3a]" />
            <div>
              <p className="text-sm font-semibold">{user?.name || "Carregando..."}</p>
              <p className="text-xs text-[#6b6b6b]">{user?.email || "Carregando..."}</p>
            </div>
          </div>
        </div>
      </div>


      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
