import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-8 text-center  relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/src/assets/texture.png')] opacity-10 bg-cover bg-center pointer-events-none"></div>

      <h2 className="text-4xl font-serif mb-8 text-[#5b4636] drop-shadow-md animate-fade-in-up">
        Pronto para começar?
      </h2>
      <button 
        onClick={() => navigate('/login')}
        className="px-10 py-4 bg-[#8b5e3c] text-white font-bold rounded-full hover:bg-[#a4714f] transition-all duration-300 shadow-md hover:scale-105 animate-bounce-slow"
      >
        Entrar no Task Manager
      </button>
    </section>
  );
}
