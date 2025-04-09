import React from 'react';

export default function AboutSection() {
  return (
    <section className="py-40 px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/src/assets/texture.png')] opacity-10 bg-cover bg-center pointer-events-none"></div>

      <h2 className="text-4xl font-serif mb-8 text-[#5b4636] drop-shadow-md">
        Sobre o Projeto
      </h2>
      <p className="text-lg font-sans max-w-3xl mx-auto text-[#5b4636] leading-relaxed drop-shadow-sm">
        O Task Manager é uma aplicação criada para ajudar você a organizar suas tarefas de forma visual, divertida e eficiente.
        Movimente seus post-its encantados e mantenha o foco nos seus sonhos e metas.
      </p>
    </section>
  );
}
