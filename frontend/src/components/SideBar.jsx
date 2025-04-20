import React, { useState } from "react";
import { FaRegUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiLayer, BiFolder } from "react-icons/bi";
import texture from "../assets/texture.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  }

  return (
    <>
      {/* Botão hambúrguer mobile */}
      <button
        className="fixed top-4 left-4 md:hidden bg-[#7f833a] p-2 rounded text-white z-50 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen w-64 bg-[#D4B99D] border-r border-[#A17D5E] shadow-lg flex flex-col 
        transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Textura no fundo */}
        <div
          className="absolute inset-0 w-full h-full opacity-10 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100% 100%",
          }}
        ></div>

        {/* Cabeçalho com usuário */}
        <div className="relative z-10 p-4 flex flex-col items-center">
          <div className="flex items-center space-x-3">
            <FaRegUser className="text-2xl text-[#3a3a3a]" />
            <h1 className="text-lg font-semibold text-[#3a3a3a]">{user?.name || "Carregando..."}</h1>
          </div>
          <button
            onClick={() => navigate("/boards")}
            className="mt-4 w-full bg-[#7f833a] text-white py-2 rounded-lg hover:bg-[#6d7132] flex items-center justify-center space-x-2 font-medium shadow-sm"
          >
            <span>+ Criar Quadro</span>
          </button>
        </div>

        {/* Navegação */}
        <nav className="relative z-10 flex-1 mt-6 px-4">
          <ul className="space-y-2 text-[#3a3a3a]">
            <li
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer transition"
            >
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </li>
            <li
              onClick={() => navigate("/boards")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer transition"
            >
              <BiLayer className="text-xl" />
              <span>Quadros</span>
            </li>
            <li
              onClick={() => navigate("/projects")}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer transition"
            >
              <BiFolder className="text-xl" />
              <span>Projetos</span>
            </li>
          </ul>
        </nav>

        {/* Rodapé */}
        <div className="relative z-10 p-4 border-t border-[#A17D5E] mt-auto">
          <div
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#e0c6a8] cursor-pointer transition"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Sair</span>
          </div>

          <div className="mt-4 flex items-center space-x-3 px-3 py-2 rounded-lg ">
            <FaRegUser className="text-xl text-[#3a3a3a]" />
            <div>
              <p className="text-sm font-semibold">{user?.name || "Carregando..."}</p>
              <p className="text-xs text-[#6b6b6b]">{user?.email || "..."}</p>
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
