import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full px-6 py-4 flex justify-between items-center shadow-md bg-[#f3e8d6] z-50 relative"
    >
      {/* Logo / Nome */}
      <div
        onClick={() => navigate('/')}
        className="text-2xl font-serif text-[#3C2A21] cursor-pointer hover:opacity-80 transition"
      >
        Task Manager
      </div>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 items-center font-sans text-[#3C2A21] text-sm">
        <motion.li
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer hover:text-[#a4714f] transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Início
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer hover:text-[#a4714f] transition"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Sobre
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer hover:text-[#a4714f] transition"
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Funcionalidades
        </motion.li>
      </ul>

      {/* Botão Entrar */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/login')}
        className="ml-6 bg-[#8b5e3c] text-white font-bold px-6 py-2 rounded-full hover:bg-[#a4714f] transition-all duration-300 text-sm shadow-md"
      >
        Entrar
      </motion.button>
    </motion.nav>
  );
}
