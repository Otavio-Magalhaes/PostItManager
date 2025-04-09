import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full flex justify-between items-center p-6 "
    >
      <div className="text-2xl font-serif text-[#3C2A21] cursor-pointer">
        Task Manager
      </div>
      <ul className="flex gap-8 font-sans text-[#3C2A21]">
        <motion.li 
          whileHover={{ scale: 1.1 }}
          className="cursor-pointer hover:underline"
        >
          Início
        </motion.li>
        <motion.li 
          whileHover={{ scale: 1.1 }}
          className="cursor-pointer hover:underline"
        >
          Sobre
        </motion.li>
        <motion.li 
          whileHover={{ scale: 1.1 }}
          className="cursor-pointer hover:underline"
        >
          Funcionalidades
        </motion.li>
        <motion.li 
          whileHover={{ scale: 1.1 }}
          className="cursor-pointer hover:underline"
        >
          Comece Agora
        </motion.li>
      </ul>
    </motion.nav>
  );
}
