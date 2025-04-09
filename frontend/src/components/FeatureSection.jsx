import React from 'react';

export default function FeaturesSection() {
  return (
    <section className="py-20 px-8 text-center">
      <h2 className="text-3xl font-serif mb-12">Funcionalidades</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 shadow-xl  bg-[#b39b81] border-2  border-[#83723a] rounded-lg">
          <h3 className="text-xl text-[#61450f] font-serif mb-2">Tarefas Ilimitadas</h3>
          <p className="font-sans">Crie quantas tarefas quiser para organizar seu dia.</p>
        </div>
        <div className="p-6 shadow-xl  bg-[#b39b81] border-2  border-[#83723a] rounded-lg">
          <h3 className="text-xl text-[#61450f] font-serif mb-2">Arraste e Solte</h3>
          <p className="font-sans">Movimente seus post-its livremente pelo quadro.</p>
        </div>
        <div className="p-6 shadow-xl  bg-[#b39b81] border-2  border-[#83723a] rounded-lg">
          <h3 className="text-xl text-[#61450f] font-serif mb-2">Salvamento Automático</h3>
          <p className="font-sans">Suas tarefas ficam salvas exatamente onde você deixou.</p>
        </div>
      </div>
    </section>
  );
}
