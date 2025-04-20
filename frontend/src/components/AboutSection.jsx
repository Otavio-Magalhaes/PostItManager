import React from 'react';

export default function AboutSection() {
  return (
    <section className="relative py-32 px-6 sm:px-12 bg-bg-[#D4B99D] overflow-hidden" id='about'>
      <div className="absolute inset-0 bg-[url('/src/assets/texture.png')] opacity-10 bg-cover bg-center pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-serif mb-6 text-[#3C2A21] drop-shadow-sm">
          Sobre o Projeto
        </h2>
        <p className="text-lg sm:text-xl font-sans text-[#5b4636] leading-relaxed drop-shadow-sm">
          O <strong>Task Manager</strong> é uma aplicação desenvolvida para ajudar você a organizar tarefas com liberdade e criatividade. 
          Visualize, movimente e controle suas metas como se fossem post-its mágicos. Um ambiente pensado para produtividade sem perder a leveza.
        </p>
      </div>
    </section>
  );
}
